'use client'

import { useState, useMemo } from 'react'
import { Search, Settings, ExternalLink, AlertTriangle, Check, X, ChevronDown, ChevronRight, Info, Shield, Zap } from 'lucide-react'
import type { SystemTweak, TweakFilters, TweakCategoryId, TweakCategory } from '@/types/tweaks'
import { TWEAK_CATEGORIES, SYSTEM_TWEAKS, searchTweaks, getTweaksByCategory, filterTweaks } from '@/data/tweaks'
import { cn } from '@/lib/utils'

interface TweakSelectorProps {
    selectedTweaks: Record<string, boolean | string | number | null>
    onTweakToggle: (tweakId: string, value: boolean | string | number | null) => void
    className?: string
}

export function TweakSelector({ selectedTweaks, onTweakToggle, className }: TweakSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

    const filteredTweaks = useMemo(() => {
        let tweaks = searchQuery ? searchTweaks(searchQuery) : SYSTEM_TWEAKS

        if (selectedCategory !== 'all') {
            tweaks = tweaks.filter((tweak: SystemTweak) => tweak.category.id === selectedCategory)
        }

        return tweaks.sort((a: SystemTweak, b: SystemTweak) => {
            // Sort by impact level first (high to low), then by name
            const impactOrder = { high: 0, medium: 1, low: 2 }
            const aImpact = impactOrder[a.impactLevel]
            const bImpact = impactOrder[b.impactLevel]

            if (aImpact !== bImpact) {
                return aImpact - bImpact
            }

            return a.name.localeCompare(b.name)
        })
    }, [searchQuery, selectedCategory])

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
        if (tweak.impactLevel === 'high') {
            return <Shield className="h-4 w-4 text-yellow-500" />
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

    const handleCategorySelect = (categoryId: string) => {
        if (categoryId === 'all') {
            setSelectedCategory('all')
            setSearchQuery('')
        } else {
            setSelectedCategory(categoryId)

            // Auto-expand category when selected
            if (!expandedCategories.has(categoryId)) {
                toggleCategoryExpanded(categoryId)
            }
        }
    }

    const handleTweakToggle = (tweak: SystemTweak) => {
        if (tweak.valueType === 'boolean') {
            const currentValue = getTweakValue(tweak.id) ?? tweak.defaultValue
            const newValue = currentValue === true ? false : true
            onTweakToggle(tweak.id, newValue)
        }
    }

    const getSubcategories = (categoryId: string) => {
        const categoryTweaks = getTweaksByCategory(categoryId as TweakCategoryId)
        const subcategories = [...new Set(categoryTweaks.map(tweak => tweak.subcategory).filter(Boolean))]
        return subcategories.sort()
    }

    // Group tweaks by subcategory for better organization
    const groupedTweaks = useMemo(() => {
        const groups: Record<string, SystemTweak[]> = {}

        filteredTweaks.forEach(tweak => {
            const subcategory = tweak.subcategory || 'general'
            if (!groups[subcategory]) {
                groups[subcategory] = []
            }
            groups[subcategory].push(tweak)
        })

        return groups
    }, [filteredTweaks])

    return (
        <div className={cn('space-y-6', className)}>
            {/* Search and Filters */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search system tweaks by name, description, or tags..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setSelectedCategory('all')
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                    Found {filteredTweaks.length} tweak{filteredTweaks.length !== 1 ? 's' : ''}
                    {Object.keys(selectedTweaks).length > 0 && ` • ${Object.keys(selectedTweaks).length} selected`}
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
                                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2',
                                selectedCategory === 'all'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent'
                            )}
                        >
                            <Settings className="w-4 h-4" />
                            <span>All Tweaks</span>
                        </button>

                        {/* Category List */}
                        {Object.values(TWEAK_CATEGORIES)
                            .sort((a: TweakCategory, b: TweakCategory) => a.order - b.order)
                            .map((category: TweakCategory) => {
                                const subcategories = getSubcategories(category.id)
                                const isExpanded = expandedCategories.has(category.id)
                                const isSelected = selectedCategory === category.id

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
                                            {subcategories.length > 0 && (
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-xs opacity-70">
                                                        {subcategories.length}
                                                    </span>
                                                    {isExpanded ? (
                                                        <ChevronDown className="w-3 h-3" />
                                                    ) : (
                                                        <ChevronRight className="w-3 h-3" />
                                                    )}
                                                </div>
                                            )}
                                        </button>
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
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {TWEAK_CATEGORIES[selectedCategory as keyof typeof TWEAK_CATEGORIES].description}
                            </p>
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
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                }}
                                className="text-primary hover:text-primary/80 text-sm font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(groupedTweaks).map(([subcategory, tweaks]) => (
                                <div key={subcategory}>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-3 capitalize">
                                        {subcategory.replace('-', ' ')}
                                    </h4>
                                    <div className="space-y-3">
                                        {tweaks.map((tweak: SystemTweak) => (
                                            <div
                                                key={tweak.id}
                                                className={cn(
                                                    'relative rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md',
                                                    isTweakSelected(tweak.id) && 'ring-2 ring-primary border-primary'
                                                )}
                                            >
                                                {/* Tweak Header */}
                                                <div className="flex items-start justify-between mb-3">
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

                                                    {/* Toggle Control */}
                                                    <div className="flex items-center space-x-2">
                                                        {tweak.valueType === 'boolean' && (
                                                            <button
                                                                onClick={() => handleTweakToggle(tweak)}
                                                                className={cn(
                                                                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                                                                    getTweakValue(tweak.id) === true
                                                                        ? 'bg-primary'
                                                                        : 'bg-muted'
                                                                )}
                                                            >
                                                                <span
                                                                    className={cn(
                                                                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                                                        getTweakValue(tweak.id) === true
                                                                            ? 'translate-x-6'
                                                                            : 'translate-x-1'
                                                                    )}
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Tweak Details */}
                                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span>{tweak.category.name}</span>
                                                        <span>•</span>
                                                        <span>macOS {tweak.minMacOSVersion}+</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span>Command:</span>
                                                        <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                                            {tweak.command(tweak.defaultValue)}
                                                        </code>
                                                    </div>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1 mb-3">
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
                                                    <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg mb-3">
                                                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-red-700 dark:text-red-300">
                                                            {tweak.warning}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Documentation */}
                                                <div className="flex items-center justify-between pt-3 border-t border-border">
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
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
