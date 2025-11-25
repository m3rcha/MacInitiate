export interface App {
  id: string
  name: string
  description: string
  category: string
  size: string
  homepage?: string
  tap?: string
  dependencies?: string[]
  conflicts?: string[]
}

export interface Tweak {
  id: string
  name: string
  description: string
  category: string
  domain: string
  key: string
  type: 'boolean' | 'string' | 'number' | 'null'
  defaultValue: boolean | string | number | null
  requiresRestart?: boolean
  requiresSudo?: boolean
  safe: boolean
  command: string
}

export interface SetupState {
  selectedApps: string[]
  selectedTweaks: Record<string, boolean | string | number | null>
  selectedTemplate?: string
  generatedScript: string
  currentStep: 'welcome' | 'apps' | 'tweaks' | 'templates' | 'generate'
  progress: number
  generationResult: import('../lib/script-generator').GenerationResult | null
  isGenerating: boolean
  scriptOptions: import('../lib/script-generator').ScriptGenerationOptions
}

export type SetupAction =
  | { type: 'SELECT_APP'; appId: string }
  | { type: 'DESELECT_APP'; appId: string }
  | { type: 'TOGGLE_TWEAK'; tweakId: string; value?: boolean | string | number | null }
  | { type: 'SELECT_TEMPLATE'; templateId: string }
  | { type: 'CLEAR_TEMPLATE' }
  | { type: 'GENERATE_SCRIPT' }
  | { type: 'SET_STEP'; step: SetupState['currentStep'] }
  | { type: 'RESET_SETUP' }
  | { type: 'START_GENERATION' }
  | { type: 'GENERATION_COMPLETE'; result: import('../lib/script-generator').GenerationResult }
  | { type: 'SET_SCRIPT_OPTIONS'; options: import('../lib/script-generator').ScriptGenerationOptions }
  | { type: 'IMPORT_CONFIG'; config: import('../lib/config-sharing').SetupConfiguration }
  | { type: 'RESET_CONFIG' }

export interface ScriptGenerationOptions {
  includeComments: boolean
  includeVerification: boolean
  parallelInstalls: boolean
  createBackup: boolean
}

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface GenerationResult {
  script: string
  errors: ValidationError[]
  warnings: ValidationError[]
  estimatedTime: number
  requiresSudo: boolean
  willRestart: boolean
}

export type SortOrder = 'name' | 'popularity' | 'size' | 'updated'
export type SortDirection = 'asc' | 'desc'

export interface SearchState {
  query: string
  filters: Record<string, unknown>
  sortOrder: SortOrder
  sortDirection: SortDirection
}
