'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { SetupState, SetupAction } from '@/types/common'
import { ScriptGenerator } from './script-generator'
import type { GenerationResult, ScriptGenerationOptions } from './script-generator'

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
            const newTweakValue = currentTweakValue === undefined ? true : !currentTweakValue
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

    const toggleTweak = (tweakId: string) => {
        dispatch({ type: 'TOGGLE_TWEAK', tweakId })
        // For now, we'll just toggle boolean values. Could be enhanced later
    }

    const isTweakSelected = (tweakId: string) => state.selectedTweaks.hasOwnProperty(tweakId)
    const selectedCount = Object.keys(state.selectedTweaks).length

    return {
        selectedTweaks: state.selectedTweaks,
        toggleTweak,
        isTweakSelected,
        selectedCount,
    }
}

export function useScriptGeneration() {
    const { state, dispatch } = useSetup()

    const generateScript = async () => {
        dispatch({ type: 'START_GENERATION' })

        // Simulate async generation
        setTimeout(() => {
            const generator = new ScriptGenerator(state.scriptOptions)
            const result = generator.generateScript(state.selectedApps, state.selectedTweaks)
            dispatch({ type: 'GENERATION_COMPLETE', result })
        }, 1000)
    }

    const updateOptions = (options: ScriptGenerationOptions) => {
        dispatch({ type: 'SET_SCRIPT_OPTIONS', options })
    }

    return {
        generateScript,
        updateOptions,
        result: state.generationResult,
        isGenerating: state.isGenerating,
        options: state.scriptOptions,
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
