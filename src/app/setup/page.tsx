'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Terminal, Package, Settings, Code } from 'lucide-react'
import { AppSelector } from '@/components/AppSelector'
import { TweakSelector } from '@/components/TweakSelector'
import { ScriptPreview } from '@/components/ScriptPreview'
import { ConfigSharing } from '@/components/ConfigSharing'
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp'
import { TemplateSelector } from '@/components/TemplateSelector'
import { SetupProvider, useAppSelection, useTweakSelection, useSetupNavigation, useScriptGeneration, useTemplateSelection } from '@/lib/setup-state'
import { LanguageThemeSelector } from '@/components/LanguageThemeSelector'
import { useLanguage } from '@/contexts/language-context'
import { useTranslation } from '@/lib/i18n'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { cn } from '@/lib/utils'

function SetupContent() {
  const { selectedApps, toggleApp } = useAppSelection()
  const { selectedTweaks, toggleTweak } = useTweakSelection()
  const { currentStep, goToStep, nextStep, prevStep } = useSetupNavigation()
  const { generateScript, result, isGenerating } = useScriptGeneration()
  const { selectedTemplate, selectTemplate } = useTemplateSelection()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [showHelp, setShowHelp] = useState(false)

  React.useEffect(() => {
    if (currentStep === 'generate' && !result && !isGenerating) {
      generateScript()
    }
  }, [currentStep, result, isGenerating, generateScript])

  const shortcuts = [
    { key: 'ArrowRight', action: nextStep, description: 'Go to next step' },
    { key: 'ArrowLeft', action: prevStep, description: 'Go to previous step' },
    { key: 'Enter', action: nextStep, description: 'Submit/Continue' },
    { key: '?', action: () => setShowHelp(true), description: 'Show keyboard shortcuts' }
  ]

  useKeyboardShortcuts(shortcuts)

  const steps = [
    { id: 'welcome' as const, name: 'Welcome', icon: Terminal },
    { id: 'templates' as const, name: 'Choose Role', icon: Code },
    { id: 'apps' as const, name: 'Choose Apps', icon: Package },
    { id: 'tweaks' as const, name: 'Configure', icon: Settings },
    { id: 'generate' as const, name: 'Generate', icon: Terminal },
  ]

  const getStepIndex = (step: typeof currentStep) => steps.findIndex(s => s.id === step)
  const currentStepIndex = getStepIndex(currentStep)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-6">
              <LanguageThemeSelector />
              <div className="flex items-center space-x-3">
                <Terminal className="h-6 w-6 text-gray-900 dark:text-white" />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">Setup</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id
              const isCompleted = getStepIndex(step.id) < currentStepIndex
              const Icon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                      isActive
                        ? 'border-black bg-black text-white'
                        : isCompleted
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white text-gray-500'
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={cn(
                      'ml-3 text-sm font-medium',
                      isActive
                        ? 'text-gray-900 dark:text-white'
                        : isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500'
                    )}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'flex-1 h-px mx-4',
                      isCompleted ? 'bg-black' : 'bg-gray-300'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        {currentStep === 'welcome' && (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome to MacInitiate
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Set up your Mac with one command
              </p>
            </div>
            <button
              onClick={nextStep}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        )}

        {currentStep === 'templates' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Choose Your Developer Role
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Start with a curated template for your specific development role
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateSelect={selectTemplate}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {selectedTemplate ? 'Customize Selection' : 'Skip Templates'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 'apps' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Choose Apps
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Select applications for development and productivity
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <AppSelector
                selectedApps={selectedApps}
                onAppToggle={toggleApp}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 'tweaks' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Configure macOS
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choose system preferences and optimizations
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <TweakSelector
                selectedTweaks={selectedTweaks}
                onTweakToggle={(tweakId) => toggleTweak(tweakId)}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 'generate' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Generate Script
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your setup script is ready to run
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <ScriptPreview
                result={result}
                isGenerating={isGenerating}
                onRegenerate={generateScript}
                onOptionsChange={() => { }}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <div className="space-x-4">
                <ConfigSharing />
              </div>
            </div>
          </div>
        )}
      </main>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <KeyboardShortcutsHelp shortcuts={shortcuts} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function SetupPage() {
  return (
    <SetupProvider>
      <SetupContent />
    </SetupProvider>
  )
}
