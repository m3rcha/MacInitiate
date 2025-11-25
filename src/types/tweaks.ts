export interface SystemTweak {
  id: string
  name: string
  description: string
  category: TweakCategory
  
  // Technical details
  domain: string
  key: string
  valueType: 'boolean' | 'string' | 'integer' | 'float'
  defaultValue: boolean | string | number | null
  
  // Execution metadata
  command: (value: boolean | string | number | null) => string
  requiresRestart: boolean
  requiresSudo: boolean
  
  // Compatibility
  minMacOSVersion: string
  maxMacOSVersion?: string
  compatibleArchitectures: ('arm64' | 'x86_64')[]
  
  // Safety & validation
  safeToToggle: boolean
  impactLevel: 'low' | 'medium' | 'high'
  warning?: string
  
  // Metadata
  documentation: string
  lastVerified: string
}

export interface TweakCategory {
  id: string
  name: string
  icon: string
  description: string
  order: number
}

export type TweakCategoryId =
  | 'appearance'
  | 'input'
  | 'security'
  | 'dock'
  | 'finder'
  | 'safari'
  | 'terminal'
  | 'development'

export interface TweakFilters {
  category?: TweakCategoryId
  impactLevel?: SystemTweak['impactLevel']
  requiresRestart?: boolean
  requiresSudo?: boolean
  search?: string
}
