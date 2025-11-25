'use client'

// =================
// AI-GENERATED CODE
// =================
// This component was created with assistance from AI and human collaboration.
// AI contributed to: Complex filtering logic, pagination, Turkish localization, selection management.
// Human collaboration: UI design, user experience improvements, bug fixes and refinements.

import { useState, useMemo } from 'react'
import { Search, Settings, ExternalLink, AlertTriangle, Check, X, ChevronDown, ChevronRight, Info, Shield, Zap, Filter, Grid, List, Clock, TrendingUp, Package } from 'lucide-react'
import type { SystemTweak, TweakFilters, TweakCategoryId, TweakCategory } from '@/types/tweaks'
import { TWEAK_CATEGORIES, SYSTEM_TWEAKS, searchTweaks, getTweaksByCategory, filterTweaks } from '@/data/tweaks'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/ui/motion'

interface TweakSelectorProps {
    selectedTweaks: Record<string, boolean | string | number | null>
    onTweakToggle: (tweakId: string, value: boolean | string | number | null) => void
    className?: string
}

export function TweakSelector({ selectedTweaks, onTweakToggle, className }: TweakSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState<'impact' | 'name' | 'category'>('impact')
    const [currentPage, setCurrentPage] = useState(1)
    const [showFilters, setShowFilters] = useState(true) // Changed from false to true

    const ITEMS_PER_PAGE = 12

    const filteredTweaks = useMemo(() => {
        let tweaks = searchQuery ? searchTweaks(searchQuery) : SYSTEM_TWEAKS

        if (selectedCategory !== 'all') {
            tweaks = tweaks.filter((tweak: SystemTweak) => tweak.category.id === selectedCategory)
        }

        if (selectedSubcategory !== 'all') {
            tweaks = tweaks.filter((tweak: SystemTweak) => tweak.subcategory === selectedSubcategory)
        }

        // Sort
        tweaks.sort((a: SystemTweak, b: SystemTweak) => {
            switch (sortBy) {
                case 'impact':
                    const impactOrder = { high: 0, medium: 1, low: 2 }
                    const aImpact = impactOrder[a.impactLevel]
                    const bImpact = impactOrder[b.impactLevel]
                    if (aImpact !== bImpact) {
                        return aImpact - bImpact
                    }
                    return a.name.localeCompare(b.name)
                case 'name':
                    return a.name.localeCompare(b.name)
                case 'category':
                    return a.category.order - b.category.order || a.name.localeCompare(b.name)
                default:
                    return a.name.localeCompare(b.name)
            }
        })

        return tweaks
    }, [searchQuery, selectedCategory, selectedSubcategory, sortBy])

    const paginatedTweaks = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return filteredTweaks.slice(startIndex, endIndex)
    }, [filteredTweaks, currentPage])

    const totalPages = Math.ceil(filteredTweaks.length / ITEMS_PER_PAGE)

    const isTweakSelected = (tweakId: string) => selectedTweaks.hasOwnProperty(tweakId)

    const getTweakValue = (tweakId: string) => selectedTweaks[tweakId]

    const getImpactColor = (impact: SystemTweak['impactLevel']) => {
        switch (impact) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }
    }

    const getSafetyIcon = (tweak: SystemTweak) => {
        if (!tweak.safeToToggle) {
            return <AlertTriangle className="h-4 w-4 text-red-500" />
        }
        return <Check className="h-4 w-4 text-green-500" />
    }

    const toggleCategoryExpanded = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId)
        } else {
            newExpanded.add(categoryId)
        }
        setExpandedCategories(newExpanded)
    }

    const getSubcategories = (categoryId: string) => {
        const categoryTweaks = getTweaksByCategory(categoryId as TweakCategoryId)
        const subcategories = [...new Set(categoryTweaks.map(tweak => tweak.subcategory).filter(Boolean))]
        return subcategories.sort()
    }

    const getCategoryCount = (categoryId: string) => {
        if (categoryId === 'all') return SYSTEM_TWEAKS.length
        return getTweaksByCategory(categoryId as TweakCategoryId).length
    }

    const handleCategorySelect = (categoryId: string) => {
        console.log('handleCategorySelect called:', { categoryId, selectedCategory, selectedSubcategory })

        if (categoryId === 'all') {
            setSelectedCategory('all')
            setSelectedSubcategory('all')
            setSearchQuery('')
        } else {
            setSelectedCategory(categoryId)
            // Don't reset subcategory if it's already 'all' or belongs to the new category
            if (selectedSubcategory !== 'all') {
                const categoryTweaks = getTweaksByCategory(categoryId as TweakCategoryId)
                const subcategories = [...new Set(categoryTweaks.map(tweak => tweak.subcategory).filter(Boolean))]
                if (!subcategories.includes(selectedSubcategory)) {
                    setSelectedSubcategory('all')
                }
            }

            // Auto-expand category when selected
            if (!expandedCategories.has(categoryId)) {
                toggleCategoryExpanded(categoryId)
            }
        }
        setCurrentPage(1)
    }

    const handleSubcategorySelect = (categoryId: string, subcategory: string) => {
        setSelectedSubcategory(subcategory)
        setCurrentPage(1)
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setSelectedCategory('all')
        setSelectedSubcategory('all')
        setCurrentPage(1)
    }

    const handleTweakToggle = (tweak: SystemTweak) => {
        if (isTweakSelected(tweak.id)) {
            // If selected, remove it completely
            onTweakToggle(tweak.id, null)
        } else {
            // If not selected, add it with default value
            onTweakToggle(tweak.id, tweak.defaultValue)
        }
    }

    // Group tweaks by subcategory for better organization
    const groupedTweaks = useMemo(() => {
        const groups: Record<string, SystemTweak[]> = {}

        paginatedTweaks.forEach(tweak => {
            const subcategory = tweak.subcategory || 'general'
            if (!groups[subcategory]) {
                groups[subcategory] = []
            }
            groups[subcategory].push(tweak)
        })

        return groups
    }, [paginatedTweaks])

    const selectedCount = Object.keys(selectedTweaks).length

    return (
        <div className={cn('space-y-6', className)}>
            {/* Search and Filters */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search tweaks by name, description, or tags..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Filter className="h-4 w-4" />
                    </button>
                </div>

                {/* Filters Bar */}
                {showFilters && (
                    <div className="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'impact' | 'name' | 'category')}
                                className="text-sm border border-border rounded px-2 py-1 bg-background"
                            >
                                <option value="impact">Impact Level</option>
                                <option value="name">Name</option>
                                <option value="category">Category</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">View:</label>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    'p-1 rounded',
                                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                )}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    'p-1 rounded',
                                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                )}
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Results Count */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        Found {filteredTweaks.length} tweak{filteredTweaks.length !== 1 ? 's' : ''}
                        {selectedCount > 0 && ` • ${selectedCount} selected`}
                    </span>
                    {filteredTweaks.length > ITEMS_PER_PAGE && (
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Categories Sidebar */}
                <div className="lg:col-span-1">
                    <div className="space-y-2">
                        {/* All Categories */}
                        <button
                            onClick={() => handleCategorySelect('all')}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between',
                                selectedCategory === 'all'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent'
                            )}
                        >
                            <div className="flex items-center space-x-2">
                                <Settings className="w-4 h-4" />
                                <span>All Tweaks</span>
                            </div>
                            <span className="text-xs opacity-70">{getCategoryCount('all')}</span>
                        </button>

                        {/* Category List */}
                        {Object.values(TWEAK_CATEGORIES)
                            .sort((a: TweakCategory, b: TweakCategory) => a.order - b.order)
                            .map((category: TweakCategory) => {
                                const subcategories = getSubcategories(category.id)
                                const isExpanded = expandedCategories.has(category.id)
                                const isSelected = selectedCategory === category.id
                                const count = getCategoryCount(category.id)

                                return (
                                    <div key={category.id}>
                                        <button
                                            onClick={() => handleCategorySelect(category.id)}
                                            className={cn(
                                                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-accent'
                                            )}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span>{category.icon}</span>
                                                <span>{category.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-xs opacity-70">{count}</span>
                                                {subcategories.length > 0 && (
                                                    isExpanded ? (
                                                        <ChevronDown className="w-3 h-3" />
                                                    ) : (
                                                        <ChevronRight className="w-3 h-3" />
                                                    )
                                                )}
                                            </div>
                                        </button>

                                        {/* Subcategories */}
                                        {isSelected && isExpanded && subcategories.length > 0 && (
                                            <div className="ml-6 mt-1 space-y-1">
                                                <button
                                                    onClick={() => handleSubcategorySelect(category.id, 'all')}
                                                    className={cn(
                                                        'w-full text-left px-3 py-1 rounded text-xs transition-colors',
                                                        selectedSubcategory === 'all'
                                                            ? 'bg-accent text-accent-foreground font-medium'
                                                            : 'hover:bg-accent/50'
                                                    )}
                                                >
                                                    All {category.name}
                                                </button>
                                                {subcategories.map((subcategory: string) => (
                                                    <button
                                                        key={subcategory}
                                                        onClick={() => handleSubcategorySelect(category.id, subcategory)}
                                                        className={cn(
                                                            'w-full text-left px-3 py-1 rounded text-xs capitalize transition-colors',
                                                            selectedSubcategory === subcategory
                                                                ? 'bg-accent text-accent-foreground font-medium'
                                                                : 'hover:bg-accent/50'
                                                        )}
                                                    >
                                                        {subcategory.replace('-', ' ')}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                </div>

                {/* Tweaks List */}
                <div className="lg:col-span-3">
                    {searchQuery && (
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Found {filteredTweaks.length} tweak{filteredTweaks.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                        </div>
                    )}

                    {!searchQuery && selectedCategory !== 'all' && (
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <span>{TWEAK_CATEGORIES[selectedCategory as keyof typeof TWEAK_CATEGORIES].icon}</span>
                                <span>{TWEAK_CATEGORIES[selectedCategory as keyof typeof TWEAK_CATEGORIES].name}</span>
                                <span className="text-sm text-muted-foreground">({getCategoryCount(selectedCategory)})</span>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {TWEAK_CATEGORIES[selectedCategory as keyof typeof TWEAK_CATEGORIES].description}
                            </p>
                            {selectedSubcategory !== 'all' && (
                                <p className="text-sm text-muted-foreground mt-1 capitalize">
                                    {selectedSubcategory.replace('-', ' ')}
                                </p>
                            )}
                        </div>
                    )}

                    {filteredTweaks.length === 0 ? (
                        <div className="text-center py-12">
                            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {searchQuery ? 'No tweaks found' : 'Select a category to browse tweaks'}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery
                                    ? 'Try adjusting your search terms or browse categories'
                                    : 'Choose a category from the sidebar to see available system tweaks'
                                }
                            </p>
                            <button
                                onClick={() => {
                                    handleSearch('')
                                    setSelectedCategory('all')
                                    setSelectedSubcategory('all')
                                }}
                                className="text-primary hover:text-primary/80 text-sm font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className={cn(
                                viewMode === 'grid'
                                    ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-2'
                                    : 'space-y-4'
                            )}>
                                {paginatedTweaks.map((tweak: SystemTweak, index: number) => (
                                    <div key={`${tweak.id}-${index}`}>
                                        <div
                                            className={cn(
                                                'relative rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer',
                                                isTweakSelected(tweak.id) && 'ring-2 ring-primary border-primary',
                                                viewMode === 'list' && 'flex items-center space-x-4'
                                            )}
                                            onClick={() => handleTweakToggle(tweak)}
                                        >
                                            {/* Selection Indicator */}
                                            {isTweakSelected(tweak.id) && (
                                                <div className={cn(
                                                    'absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center',
                                                    viewMode === 'list' && 'static top-0 right-0'
                                                )}>
                                                    <Check className="h-4 w-4 text-primary-foreground" />
                                                </div>
                                            )}

                                            {/* Tweak Header */}
                                            <div className={cn(
                                                'flex items-start justify-between',
                                                viewMode === 'list' && 'mb-0 flex-1'
                                            )}>
                                                <div className="flex items-start space-x-3 flex-1">
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        {getSafetyIcon(tweak)}
                                                        {tweak.requiresSudo && (
                                                            <Shield className="h-4 w-4 text-orange-500" />
                                                        )}
                                                        {tweak.requiresRestart && (
                                                            <Zap className="h-4 w-4 text-blue-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-foreground flex items-center space-x-2">
                                                            <span>{tweak.name}</span>
                                                            <span className={cn(
                                                                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                                                                getImpactColor(tweak.impactLevel)
                                                            )}>
                                                                {tweak.impactLevel} impact
                                                            </span>
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {tweak.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tweak Details */}
                                            <div className={cn(
                                                'flex items-center justify-between text-xs text-muted-foreground mb-3',
                                                viewMode === 'list' && 'mb-0 flex-shrink-0'
                                            )}>
                                                <div className="flex items-center space-x-3">
                                                    <span>{tweak.category.name}</span>
                                                    <span>•</span>
                                                    <span>macOS {tweak.minMacOSVersion}+</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span>Command:</span>
                                                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                                        {tweak.command(tweak.defaultValue).substring(0, 30)}...
                                                    </code>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className={cn(
                                                'flex flex-wrap gap-1 mb-3',
                                                viewMode === 'list' && 'mb-0'
                                            )}>
                                                {tweak.tags.slice(0, 3).map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-block px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {tweak.tags.length > 3 && (
                                                    <span className="inline-block px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                                                        +{tweak.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Warning */}
                                            {tweak.warning && (
                                                <div className={cn(
                                                    'flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg mb-3',
                                                    viewMode === 'list' && 'mb-0'
                                                )}>
                                                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-red-700 dark:text-red-300">
                                                        {tweak.warning}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Footer */}
                                            <div className={cn(
                                                'flex items-center justify-between pt-3 border-t border-border',
                                                viewMode === 'list' && 'border-t-0 pt-0 flex-shrink-0'
                                            )}>
                                                <span className="text-xs text-muted-foreground">
                                                    Last verified: {tweak.lastVerified}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <Info className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">
                                                        {tweak.documentation}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center space-x-2 mt-6">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 text-sm border border-border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const page = i + 1
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={cn(
                                                    'px-3 py-1 text-sm border border-border rounded',
                                                    currentPage === page
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'hover:bg-accent'
                                                )}
                                            >
                                                {page}
                                            </button>
                                        )
                                    })}
                                    {totalPages > 5 && (
                                        <>
                                            <span className="px-2 text-sm text-muted-foreground">...</span>
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                className={cn(
                                                    'px-3 py-1 text-sm border border-border rounded',
                                                    currentPage === totalPages
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'hover:bg-accent'
                                                )}
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 text-sm border border-border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
