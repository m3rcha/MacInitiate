export type TemplateRole = 'frontend' | 'backend' | 'fullstack' | 'devops'

export interface Template {
  id: string
  name: string
  role: TemplateRole
  description: string
  longDescription: string
  apps: string[]
  tweaks: string[]
  popularity: number
  author: string
  isVerified: boolean
  estimatedSetupTime: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

export interface TemplateRoleInfo {
  name: string
  description: string
  icon: string
}

export interface TemplateFilter {
  role?: TemplateRole
  difficulty?: Template['difficulty']
  author?: string
  search?: string
  isVerified?: boolean
}

// Legacy interface for backward compatibility
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
