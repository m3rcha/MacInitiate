export interface App {
  id: string
  name: string
  description: string
  longDescription?: string
  category: AppCategory
  subcategory: string
  tags: string[]
  
  // Installation metadata
  source: 'homebrew-cask' | 'mac-app-store' | 'direct-download'
  packageId: string
  installOrder: number
  
  // Compatibility & requirements
  minMacOSVersion: string
  maxMacOSVersion?: string
  dependencies: string[]
  conflictsWith: string[]
  alternatives: string[]
  
  // Metadata
  size: string
  homepage: string
  lastUpdated: string
  maintainer: string
  popularity: number
  
  // Developer-specific
  isDevTool: boolean
  commandLineTools?: string[]
  fileAssociations?: string[]
}

export interface AppCategory {
  id: string
  name: string
  icon: string
  description: string
  order: number
}

export type AppCategoryId = 
  | 'development'
  | 'productivity'
  | 'design'
  | 'communication'
  | 'media'
  | 'utilities'
  | 'security'
  | 'education'

export interface AppFilters {
  category?: AppCategoryId
  subcategory?: string
  source?: App['source']
  isDevTool?: boolean
  search?: string
}
