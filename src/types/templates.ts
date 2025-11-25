export interface DevTemplate {
  id: string
  name: string
  description: string
  author: string
  version: string
  
  // Stack definition
  language: string[]
  framework: string[]
  database: string[]
  
  // Included components
  requiredApps: string[]
  recommendedApps: string[]
  systemTweaks: string[]
  
  // Configuration
  gitConfig?: GitConfig
  shellConfig?: ShellConfig
  vscodeExtensions?: string[]
  
  // Metadata
  complexity: 'beginner' | 'intermediate' | 'advanced'
  setupTime: number
  lastUpdated: string
  downloads: number
  rating: number
}

export interface GitConfig {
  userName?: string
  userEmail?: string
  defaultBranch?: string
  autoSetupRemote?: boolean
  initDefaultBranch?: string
}

export interface ShellConfig {
  shell: 'bash' | 'zsh' | 'fish'
  prompt?: string
  aliases?: Record<string, string>
  exports?: Record<string, string>
  paths?: string[]
}

export interface TemplateFilters {
  language?: string
  framework?: string
  complexity?: DevTemplate['complexity']
  maxSetupTime?: number
  minRating?: number
}
