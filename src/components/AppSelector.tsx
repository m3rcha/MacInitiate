'use client'

import { useState, useMemo } from 'react'
import { Search, Package, ExternalLink, Check, Star, ChevronDown, ChevronRight, Filter, Grid, List, Clock, TrendingUp } from 'lucide-react'
import type { App, AppFilters, AppCategoryId, AppCategory } from '@/types/apps'
import { APP_CATEGORIES, APPS, searchApps, getAppsByCategory, filterApps } from '@/data/apps'
import { cn, formatBytes, truncate } from '@/lib/utils'

interface AppSelectorProps {
    selectedApps: string[]
    onAppToggle: (appId: string) => void
    className?: string
}

export function AppSelector({ selectedApps, onAppToggle, className }: AppSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'size'>('popularity')
    const [currentPage, setCurrentPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)

    const ITEMS_PER_PAGE = 12

    const filteredApps = useMemo(() => {
        let apps = searchQuery ? searchApps(searchQuery) : APPS

        if (selectedCategory !== 'all') {
            apps = apps.filter((app: App) => app.category.id === selectedCategory)
        }

        if (selectedSubcategory !== 'all') {
            apps = apps.filter((app: App) => app.subcategory === selectedSubcategory)
        }

        // Sort
        apps.sort((a: App, b: App) => {
            switch (sortBy) {
                case 'popularity':
                    return b.popularity - a.popularity
                case 'name':
                    return a.name.localeCompare(b.name)
                case 'size':
                    return parseInt(a.size) - parseInt(b.size)
                default:
                    return b.popularity - a.popularity
            }
        })

        return apps
    }, [searchQuery, selectedCategory, selectedSubcategory, sortBy, selectedApps])

    const paginatedApps = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return filteredApps.slice(startIndex, endIndex)
    }, [filteredApps, currentPage])

    const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE)

    const isAppSelected = (appId: string) => selectedApps.includes(appId)

    const getAppSourceColor = (source: App['source']) => {
        switch (source) {
            case 'homebrew-cask':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            case 'mac-app-store':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            case 'direct-download':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }
    }

    const getSourceLabel = (source: App['source']) => {
        switch (source) {
            case 'homebrew-cask':
                return 'Homebrew'
            case 'mac-app-store':
                return 'App Store'
            case 'direct-download':
                return 'Direct'
            default:
                return source
        }
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
        const categoryApps = getAppsByCategory(categoryId as AppCategoryId)
        const subcategories: string[] = [...new Set(categoryApps.map((app: App) => app.subcategory).filter(Boolean))]
        return subcategories.sort()
    }

    const getCategoryCount = (categoryId: string) => {
        if (categoryId === 'all') return APPS.length
        return getAppsByCategory(categoryId as AppCategoryId).length
    }

    const handleCategorySelect = (categoryId: string) => {
        if (categoryId === 'all') {
            setSelectedCategory('all')
            setSelectedSubcategory('all')
            setSearchQuery('')
        } else {
            setSelectedCategory(categoryId)
            setSelectedSubcategory('all')

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

    return (
        <div className={cn('space-y-6', className)}>
            {/* Search and Filters */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search apps by name, description, or tags..."
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
                                onChange={(e) => setSortBy(e.target.value as 'popularity' | 'name' | 'size')}
                                className="text-sm border border-border rounded px-2 py-1 bg-background"
                            >
                                <option value="popularity">Popularity</option>
                                <option value="name">Name</option>
                                <option value="size">Size</option>
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
                        Found {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''}
                        {selectedApps.length > 0 && ` • ${selectedApps.length} selected`}
                    </span>
                    {filteredApps.length > ITEMS_PER_PAGE && (
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
                                <Package className="w-4 h-4" />
                                <span>All Categories</span>
                            </div>
                            <span className="text-xs opacity-70">{getCategoryCount('all')}</span>
                        </button>

                        {/* Category List */}
                        {Object.values(APP_CATEGORIES)
                            .sort((a: AppCategory, b: AppCategory) => a.order - b.order)
                            .map((category: AppCategory) => {
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

                {/* Apps Grid */}
                <div className="lg:col-span-3">
                    {searchQuery && (
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Found {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                        </div>
                    )}

                    {!searchQuery && selectedCategory !== 'all' && (
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <span>{APP_CATEGORIES[selectedCategory as keyof typeof APP_CATEGORIES].icon}</span>
                                <span>{APP_CATEGORIES[selectedCategory as keyof typeof APP_CATEGORIES].name}</span>
                                <span className="text-sm text-muted-foreground">({getCategoryCount(selectedCategory)})</span>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {APP_CATEGORIES[selectedCategory as keyof typeof APP_CATEGORIES].description}
                            </p>
                            {selectedSubcategory !== 'all' && (
                                <p className="text-sm text-muted-foreground mt-1 capitalize">
                                    {selectedSubcategory.replace('-', ' ')}
                                </p>
                            )}
                        </div>
                    )}

                    {filteredApps.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {searchQuery ? 'No apps found' : 'Select a category to browse apps'}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery
                                    ? 'Try adjusting your search terms or browse categories'
                                    : 'Choose a category from the sidebar to see available apps'
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
                                    ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
                                    : 'space-y-4'
                            )}>
                                {paginatedApps.map((app: App, index: number) => (
                                    <div
                                        key={`${app.id}-${index}`}
                                        className={cn(
                                            'relative rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer',
                                            isAppSelected(app.id) && 'ring-2 ring-primary border-primary',
                                            viewMode === 'list' && 'flex items-center space-x-4'
                                        )}
                                        onClick={() => onAppToggle(app.id)}
                                    >
                                        {/* Selection Indicator */}
                                        {isAppSelected(app.id) && (
                                            <div className={cn(
                                                'absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center',
                                                viewMode === 'list' && 'static top-0 right-0'
                                            )}>
                                                <Check className="h-4 w-4 text-primary-foreground" />
                                            </div>
                                        )}

                                        {/* App Header */}
                                        <div className={cn(
                                            'flex items-start justify-between mb-3',
                                            viewMode === 'list' && 'mb-0 flex-1'
                                        )}>
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Package className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-foreground truncate">
                                                        {app.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className={cn(
                                                            'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                                                            getAppSourceColor(app.source)
                                                        )}>
                                                            {getSourceLabel(app.source)}
                                                        </span>
                                                        {app.isDevTool && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                                                Dev Tool
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* App Description */}
                                        <p className={cn(
                                            'text-sm text-muted-foreground mb-3 line-clamp-2',
                                            viewMode === 'list' && 'mb-0 flex-1'
                                        )}>
                                            {app.description}
                                        </p>

                                        {/* App Details */}
                                        <div className={cn(
                                            'flex items-center justify-between text-xs text-muted-foreground mb-3',
                                            viewMode === 'list' && 'mb-0 flex-shrink-0'
                                        )}>
                                            <div className="flex items-center space-x-3">
                                                <span>{app.size}</span>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    <span>{app.popularity}%</span>
                                                </div>
                                            </div>
                                            <span>{app.category.name}</span>
                                        </div>

                                        {/* Tags */}
                                        <div className={cn(
                                            'flex flex-wrap gap-1 mb-3',
                                            viewMode === 'list' && 'mb-0'
                                        )}>
                                            {app.tags.slice(0, 3).map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="inline-block px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {app.tags.length > 3 && (
                                                <span className="inline-block px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                                                    +{app.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className={cn(
                                            'flex items-center justify-between pt-3 border-t border-border',
                                            viewMode === 'list' && 'border-t-0 pt-0 flex-shrink-0'
                                        )}>
                                            <span className="text-xs text-muted-foreground">
                                                {app.maintainer}
                                            </span>
                                            <a
                                                href={app.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
                                            >
                                                <span>Website</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
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
