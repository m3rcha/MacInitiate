export interface SetupState {
  selectedApps: string[]
  selectedTweaks: string[]
  selectedTemplate?: string
  generatedScript: string
  currentStep: 'welcome' | 'apps' | 'tweaks' | 'templates' | 'generate'
  progress: number
}

export type SetupAction =
  | { type: 'SELECT_APP'; appId: string }
  | { type: 'DESELECT_APP'; appId: string }
  | { type: 'TOGGLE_TWEAK'; tweakId: string }
  | { type: 'SELECT_TEMPLATE'; templateId: string }
  | { type: 'CLEAR_TEMPLATE' }
  | { type: 'GENERATE_SCRIPT' }
  | { type: 'SET_STEP'; step: SetupState['currentStep'] }
  | { type: 'RESET_SETUP' }

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
