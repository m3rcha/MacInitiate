'use client'

// =================
// AI-GENERATED CODE
// =================
// This component was created with assistance from AI and human collaboration.
// AI contributed to: State management architecture, action types, complex toggling logic.
// Human collaboration: Bug fixing for selection states, integration with UI components.

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { App, Tweak, SetupState, SetupAction } from '@/types/common'
import { ScriptGenerator, GenerationResult, ScriptGenerationOptions } from '@/lib/script-generator'
import { ConfigSharing, SetupConfiguration } from '@/lib/config-sharing'
import { APPS } from '@/data/apps'
import { SYSTEM_TWEAKS } from '@/data/tweaks'
import type { App as AppType, Tweak as TweakType } from '@/types/common'

const initialState: SetupState = {
    selectedApps: [],
    selectedTweaks: {},
    generatedScript: '',
    currentStep: 'welcome',
    progress: 0,
    generationResult: null,
    isGenerating: false,
    scriptOptions: {
        includeComments: true,
        includeVerification: true,
        parallelInstalls: false,
        createBackup: false,
    },
}

function setupReducer(state: SetupState, action: SetupAction): SetupState {
    switch (action.type) {
        case 'SELECT_APP':
            return {
                ...state,
                selectedApps: state.selectedApps.includes(action.appId)
                    ? state.selectedApps
                    : [...state.selectedApps, action.appId],
            }

        case 'DESELECT_APP':
            return {
                ...state,
                selectedApps: state.selectedApps.filter(id => id !== action.appId),
            }

        case 'TOGGLE_TWEAK':
            const currentTweakValue = state.selectedTweaks[action.tweakId]
            let newTweakValue: boolean | string | number | null

            if (currentTweakValue === undefined) {
                // If not selected, set to the provided value or true
                newTweakValue = action.value !== undefined ? action.value : true
            } else if (action.value !== undefined) {
                // If a specific value is provided, use it
                newTweakValue = action.value

                // If the value is null, remove the tweak entirely (deselection)
                if (action.value === null) {
                    const newSelectedTweaks = { ...state.selectedTweaks }
                    delete newSelectedTweaks[action.tweakId]
                    return {
                        ...state,
                        selectedTweaks: newSelectedTweaks,
                    }
                }
            } else if (typeof currentTweakValue === 'boolean') {
                // For boolean values, toggle true/false
                newTweakValue = !currentTweakValue
            } else {
                // For non-boolean values, remove them (deselect)
                // We'll handle removal by deleting the key
                const newSelectedTweaks = { ...state.selectedTweaks }
                delete newSelectedTweaks[action.tweakId]
                return {
                    ...state,
                    selectedTweaks: newSelectedTweaks,
                }
            }

            return {
                ...state,
                selectedTweaks: {
                    ...state.selectedTweaks,
                    [action.tweakId]: newTweakValue,
                },
            }

        case 'SELECT_TEMPLATE':
            return {
                ...state,
                selectedTemplate: action.templateId,
            }

        case 'CLEAR_TEMPLATE':
            return {
                ...state,
                selectedTemplate: undefined,
            }

        case 'GENERATE_SCRIPT':
            return {
                ...state,
                generatedScript: generateScript(state.selectedApps, Object.keys(state.selectedTweaks)),
            }

        case 'START_GENERATION':
            return {
                ...state,
                isGenerating: true,
            }

        case 'GENERATION_COMPLETE':
            return {
                ...state,
                isGenerating: false,
                generationResult: action.result,
                generatedScript: action.result.script,
            }

        case 'SET_SCRIPT_OPTIONS':
            return {
                ...state,
                scriptOptions: action.options,
            }

        case 'SET_STEP':
            const stepIndex = ['welcome', 'apps', 'tweaks', 'templates', 'generate'].indexOf(action.step)
            return {
                ...state,
                currentStep: action.step,
                progress: (stepIndex / 4) * 100,
            }

        case 'RESET_SETUP':
            return {
                ...initialState,
            }

        case 'IMPORT_CONFIG':
            return {
                ...state,
                selectedApps: action.config.apps,
                selectedTweaks: action.config.tweaks,
                generationResult: null,
                generatedScript: '',
                currentStep: 'generate',
                progress: 80,
            }

        case 'RESET_CONFIG':
            return {
                ...state,
                selectedApps: [],
                selectedTweaks: {},
                generationResult: null,
                generatedScript: '',
                currentStep: 'welcome',
                progress: 0,
            }

        default:
            return state
    }
}

function generateScript(selectedApps: string[], selectedTweaks: string[]): string {
    const scriptLines = [
        '#!/bin/bash',
        'set -e',
        '',
        '# MacInitiate Generated Setup Script',
        `# Generated on ${new Date().toISOString()}`,
        '',
    ]

    if (selectedApps.length > 0) {
        scriptLines.push('# Install Applications')
        scriptLines.push(`brew install --cask ${selectedApps.join(' ')}`)
        scriptLines.push('')
    }

    if (selectedTweaks.length > 0) {
        scriptLines.push('# Apply System Preferences')
        selectedTweaks.forEach(tweakId => {
            scriptLines.push(`# Apply ${tweakId}`)
            scriptLines.push('# TODO: Add actual defaults write command')
        })
        scriptLines.push('')
    }

    scriptLines.push('echo "Setup complete! Restart your machine to apply all changes."')

    return scriptLines.join('\n')
}

const SetupContext = createContext<{
    state: SetupState
    dispatch: React.Dispatch<SetupAction>
} | null>(null)

export function SetupProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [state, dispatch] = useReducer(setupReducer, initialState)

    return (
        <SetupContext.Provider value={{ state, dispatch }}>
            {children}
        </SetupContext.Provider>
    )
}

export function useSetup() {
    const context = useContext(SetupContext)
    if (!context) {
        throw new Error('useSetup must be used within a SetupProvider')
    }
    return context
}

export function useAppSelection() {
    const { state, dispatch } = useSetup()

    const toggleApp = (appId: string) => {
        if (state.selectedApps.includes(appId)) {
            dispatch({ type: 'DESELECT_APP', appId })
        } else {
            dispatch({ type: 'SELECT_APP', appId })
        }
    }

    const isAppSelected = (appId: string) => state.selectedApps.includes(appId)
    const selectedCount = state.selectedApps.length

    return {
        selectedApps: state.selectedApps,
        toggleApp,
        isAppSelected,
        selectedCount,
    }
}

export function useTweakSelection() {
    const { state, dispatch } = useSetup()

    const toggleTweak = (tweakId: string, value?: boolean | string | number | null) => {
        dispatch({ type: 'TOGGLE_TWEAK', tweakId, value })
    }

    const isTweakSelected = (tweakId: string) => state.selectedTweaks.hasOwnProperty(tweakId)
    const getTweakValue = (tweakId: string) => state.selectedTweaks[tweakId]
    const selectedCount = Object.keys(state.selectedTweaks).length

    return {
        selectedTweaks: state.selectedTweaks,
        toggleTweak,
        isTweakSelected,
        getTweakValue,
        selectedCount,
    }
}

export function useScriptGeneration() {
    const { state, dispatch } = useSetup()

    const generateScript = async () => {
        dispatch({ type: 'START_GENERATION' })

        // Simulate async generation
        await new Promise(resolve => setTimeout(resolve, 1500))

        const generator = new ScriptGenerator()
        const result = generator.generateScript(
            state.selectedApps,
            state.selectedTweaks
        )

        dispatch({ type: 'GENERATION_COMPLETE', result })
    }

    const updateOptions = (options: ScriptGenerationOptions) => {
        dispatch({ type: 'SET_SCRIPT_OPTIONS', options })
    }

    return {
        generateScript,
        updateOptions,
        result: state.generationResult,
        isGenerating: state.isGenerating,
        options: state.scriptOptions
    }
}

export function useConfigurationSharing() {
    const { state, dispatch } = useSetup()

    const importConfiguration = (config: SetupConfiguration) => {
        dispatch({ type: 'IMPORT_CONFIG', config })
    }

    const resetConfiguration = () => {
        dispatch({ type: 'RESET_CONFIG' })
    }

    // Auto-import from URL on mount
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const config = ConfigSharing.extractConfigFromUrl()
            if (config) {
                importConfiguration(config)
            }
        }
    }, [])

    return {
        importConfiguration,
        resetConfiguration,
        currentConfig: ConfigSharing.createFromState(
            state.selectedApps,
            state.selectedTweaks
        )
    }
}

export function useSetupNavigation() {
    const { state, dispatch } = useSetup()

    const goToStep = (step: SetupState['currentStep']) => {
        dispatch({ type: 'SET_STEP', step })
    }

    const nextStep = () => {
        const steps: SetupState['currentStep'][] = ['welcome', 'apps', 'tweaks', 'templates', 'generate']
        const currentIndex = steps.indexOf(state.currentStep)
        if (currentIndex < steps.length - 1) {
            goToStep(steps[currentIndex + 1])
        }
    }

    const prevStep = () => {
        const steps: SetupState['currentStep'][] = ['welcome', 'apps', 'tweaks', 'templates', 'generate']
        const currentIndex = steps.indexOf(state.currentStep)
        if (currentIndex > 0) {
            goToStep(steps[currentIndex - 1])
        }
    }

    const reset = () => {
        dispatch({ type: 'RESET_SETUP' })
    }

    return {
        currentStep: state.currentStep,
        progress: state.progress,
        goToStep,
        nextStep,
        prevStep,
        reset,
    }
}
