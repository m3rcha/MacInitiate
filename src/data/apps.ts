import type { App, AppCategory, AppFilters, AppCategoryId } from '@/types/apps'

export const APP_CATEGORIES: Record<AppCategoryId, AppCategory> = {
  development: {
    id: 'development',
    name: 'Development',
    icon: '💻',
    description: 'Developer tools and IDEs',
    order: 1,
  },
  productivity: {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    description: 'Tools to boost your workflow',
    order: 2,
  },
  design: {
    id: 'design',
    name: 'Design & Creative',
    icon: '🎨',
    description: 'Design, graphics, and creative tools',
    order: 3,
  },
  communication: {
    id: 'communication',
    name: 'Communication',
    icon: '💬',
    description: 'Chat, email, and collaboration',
    order: 4,
  },
  media: {
    id: 'media',
    name: 'Media & Entertainment',
    icon: '��',
    description: 'Music, video, and streaming',
    order: 5,
  },
  utilities: {
    id: 'utilities',
    name: 'Utilities',
    icon: '🛠️',
    description: 'System utilities and tools',
    order: 6,
  },
  security: {
    id: 'security',
    name: 'Security',
    icon: '🔒',
    description: 'Security and privacy tools',
    order: 7,
  },
  education: {
    id: 'education',
    name: 'Education',
    icon: '📚',
    description: 'Learning and educational tools',
    order: 8,
  },
}

export const APPS: App[] = [
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Free source-code editor made by Microsoft',
    category: APP_CATEGORIES.development,
    subcategory: 'ides',
    tags: ['editor', 'typescript', 'javascript', 'microsoft'],
    source: 'homebrew-cask',
    packageId: 'visual-studio-code',
    installOrder: 1,
    minMacOSVersion: '10.15',
    dependencies: [],
    conflictsWith: [],
    alternatives: ['sublime-text', 'atom'],
    size: '400MB',
    homepage: 'https://code.visualstudio.com',
    lastUpdated: '2024-01-15',
    maintainer: 'Microsoft',
    popularity: 95,
    isDevTool: true,
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    description: 'Knowledge base and note-taking app',
    category: APP_CATEGORIES.productivity,
    subcategory: 'note-taking',
    tags: ['notes', 'knowledge', 'markdown'],
    source: 'homebrew-cask',
    packageId: 'obsidian',
    installOrder: 10,
    minMacOSVersion: '10.13',
    dependencies: [],
    conflictsWith: [],
    alternatives: ['notion', 'logseq'],
    size: '200MB',
    homepage: 'https://obsidian.md',
    lastUpdated: '2024-01-16',
    maintainer: 'Obsidian Team',
    popularity: 80,
    isDevTool: false,
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative design tool',
    category: APP_CATEGORIES.design,
    subcategory: 'ui-ux',
    tags: ['design', 'ui', 'ux', 'collaboration'],
    source: 'homebrew-cask',
    packageId: 'figma',
    installOrder: 25,
    minMacOSVersion: '10.11',
    dependencies: [],
    conflictsWith: ['sketch'],
    alternatives: ['sketch', 'adobe-xd'],
    size: '200MB',
    homepage: 'https://www.figma.com',
    lastUpdated: '2024-01-17',
    maintainer: 'Figma Inc.',
    popularity: 90,
    isDevTool: false,
  },
]

export function searchApps(query: string): App[] {
  const lowercaseQuery = query.toLowerCase()
  return APPS.filter(app => 
    app.name.toLowerCase().includes(lowercaseQuery) ||
    app.description.toLowerCase().includes(lowercaseQuery) ||
    app.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getAppsByCategory(categoryId: AppCategoryId): App[] {
  return APPS.filter(app => app.category.id === categoryId)
}

export function filterApps(apps: App[], filters: AppFilters): App[] {
  return apps.filter(app => {
    if (filters.category && app.category.id !== filters.category) return false
    if (filters.subcategory && app.subcategory !== filters.subcategory) return false
    if (filters.source && app.source !== filters.source) return false
    if (filters.isDevTool !== undefined && app.isDevTool !== filters.isDevTool) return false
    if (filters.search) {
      const search = filters.search.toLowerCase()
      if (!app.name.toLowerCase().includes(search) && 
          !app.description.toLowerCase().includes(search) &&
          !app.tags.some(tag => tag.toLowerCase().includes(search))) {
        return false
      }
    }
    return true
  })
}

export function getAppById(id: string): App | undefined {
  return APPS.find(app => app.id === id)
}
