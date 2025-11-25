'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Terminal, Package, Settings, Code, Keyboard, Sparkles, Zap, Shield } from 'lucide-react'
import { AppSelector } from '@/components/AppSelector'
import { TweakSelector } from '@/components/TweakSelector'
import { ScriptPreview } from '@/components/ScriptPreview'
import { ConfigSharing } from '@/components/ConfigSharing'
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp'
import { SetupProvider, useAppSelection, useTweakSelection, useSetupNavigation, useScriptGeneration } from '@/lib/setup-state'
import { LanguageThemeSelector } from '@/components/LanguageThemeSelector'
import { useLanguage } from '@/contexts/language-context'
import { useTranslation } from '@/lib/i18n'
import {
  AnimatedContainer,
  AnimatedCard,
  PageTransition,
  transitions,
  StaggerContainer,
  StaggerItem
} from '@/components/ui/motion'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { cn } from '@/lib/utils'

function SetupContent() {
  const { selectedApps, toggleApp } = useAppSelection()
  const { selectedTweaks, toggleTweak } = useTweakSelection()
  const { currentStep, goToStep, nextStep, prevStep } = useSetupNavigation()
  const { generateScript, result, isGenerating, updateOptions } = useScriptGeneration()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [showHelp, setShowHelp] = useState(false)

  // Auto-generate script when reaching generate step
  React.useEffect(() => {
    if (currentStep === 'generate' && !result && !isGenerating) {
      generateScript()
    }
  }, [currentStep, result, isGenerating, generateScript])

  // Define keyboard shortcuts
  const shortcuts = [
    { key: 'ArrowRight', action: nextStep, description: 'Go to next step' },
    { key: 'ArrowLeft', action: prevStep, description: 'Go to previous step' },
    { key: 'Enter', action: nextStep, description: 'Submit/Continue' },
    { key: 'Escape', action: () => goToStep('welcome'), description: 'Go to welcome' },
    { key: '?', action: () => setShowHelp(true), description: 'Show keyboard shortcuts' }
  ]

  const shortcutsWithKeys = useKeyboardShortcuts(shortcuts)

  const steps = [
    { id: 'welcome' as const, name: t.setup.welcome.title, icon: Terminal },
    { id: 'apps' as const, name: t.setup.apps.title, icon: Package },
    { id: 'tweaks' as const, name: t.setup.tweaks.title, icon: Settings },
    { id: 'templates' as const, name: t.setup.templates.title, icon: Code },
    { id: 'generate' as const, name: t.setup.generate.title, icon: Terminal },
  ]

  const getStepIndex = (step: typeof currentStep) => steps.findIndex(s => s.id === step)
  const currentStepIndex = getStepIndex(currentStep)

  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
        {/* Header */}
        <AnimatedContainer variant="slideDown">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.navigation.backToHome}
                </Link>
                <div className="flex items-center space-x-6">
                  <LanguageThemeSelector />
                  <div className="flex items-center space-x-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    <span className="text-xl font-semibold">{t.navigation.setup}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </AnimatedContainer>

        {/* Progress Bar */}
        <AnimatedContainer variant="fadeIn">
          <div className="border-b border-border bg-muted/50">
            <div className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id
                  const isCompleted = getStepIndex(step.id) < currentStepIndex
                  const Icon = step.icon

                  return (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => goToStep(step.id)}
                        className={cn(
                          "flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : isCompleted
                              ? "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                              : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="hidden sm:inline">{step.name}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <div className="mx-4 h-px w-12 bg-border" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="mx-auto max-w-5xl">
            {/* Welcome Step */}
            {currentStep === 'welcome' && (
              <AnimatedContainer variant="slideUp" className="space-y-12">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                    <Terminal className="w-4 h-4 mr-2" />
                    Step 1 of 4
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {language === 'tr' ? 'Mac\'ınızı Kurun' : 'Setup your Mac'}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      {language === 'tr'
                        ? 'Uygulamalarınızı ve sistem tercihlerinizi seçin. Her şeyi kurmak için tek bir komut oluşturacağız.'
                        : 'Choose your apps and system preferences. We\'ll generate a single command to set up everything.'
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <div className="h-12 w-12 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {language === 'tr' ? 'Temel Uygulamalar' : 'Essential Apps'}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {language === 'tr'
                          ? 'Geliştirme ve üretkenlik için 250+ özenle seçilmiş uygulama'
                          : '250+ curated applications for development and productivity'
                        }
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {language === 'tr' ? 'Sistem Tercihleri' : 'System Preferences'}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {language === 'tr'
                          ? 'macOS deneyimini optimize etmek için 86+ ayar'
                          : '86+ tweaks to optimize your macOS experience'
                        }
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 mx-auto bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Terminal className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {language === 'tr' ? 'Tek Komut' : 'One Command'}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {language === 'tr'
                          ? 'Her şeyi kurmak ve yapılandırmak için tek terminal scripti'
                          : 'Single terminal script to install and configure everything'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={nextStep}
                    className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {language === 'tr' ? 'Başla' : 'Get Started'}
                    <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                  </button>
                </div>
              </AnimatedContainer>
            )}

            {/* Apps Step */}
            {currentStep === 'apps' && (
              <AnimatedContainer variant="slideUp" className="space-y-12">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300">
                    <Package className="w-4 h-4 mr-2" />
                    Step 2 of 4
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {language === 'tr' ? 'Uygulamaları Seçin' : 'Choose Apps'}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      {language === 'tr'
                        ? 'Geliştirme ve üretkenlik için 250+ özenle seçilmiş uygulamadan seçim yapın.'
                        : 'Select from 250+ curated applications for development and productivity.'
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
                  <AppSelector
                    selectedApps={selectedApps}
                    onAppToggle={toggleApp}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === 'tr' ? 'Geri' : 'Back'}
                  </button>
                  <button
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {language === 'tr' ? 'Devam Et' : 'Continue'}
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </button>
                </div>
              </AnimatedContainer>
            )}

            {/* Tweaks Step */}
            {currentStep === 'tweaks' && (
              <AnimatedContainer variant="slideUp" className="space-y-12">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-sm font-medium text-orange-700 dark:text-orange-300">
                    <Settings className="w-4 h-4 mr-2" />
                    Step 3 of 4
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {language === 'tr' ? 'macOS\'u Yapılandırın' : 'Configure macOS'}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      {language === 'tr'
                        ? 'macOS deneyimlerinizi optimize etmek için sistem tercihleri ve ayarları seçin.'
                        : 'Choose system preferences and optimizations for your macOS experience.'
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
                  <TweakSelector
                    selectedTweaks={selectedTweaks}
                    onTweakToggle={(tweakId) => toggleTweak(tweakId)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === 'tr' ? 'Geri' : 'Back'}
                  </button>
                  <button
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {language === 'tr' ? 'Devam Et' : 'Continue'}
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </button>
                </div>
              </AnimatedContainer>
            )}

            {/* Templates Step */}
            {
              currentStep === 'templates' && (
                <AnimatedContainer variant="slideUp" className="space-y-12">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-700 dark:text-green-300">
                      <Code className="w-4 h-4 mr-2" />
                      Step 3 of 4
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Templates
                      </h1>
                      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Pre-configured setups for different workflows. Coming soon.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg text-center">
                    <div className="h-16 w-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                      <Code className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Coming Soon</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Templates for developers, designers, and power users will be available soon.
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={prevStep}
                      className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {language === 'tr' ? 'Geri' : 'Back'}
                    </button>
                  </div>
                </AnimatedContainer >
              )
            }

            {/* Generate Step */}
            {
              currentStep === 'generate' && (
                <AnimatedContainer variant="slideUp" className="space-y-12">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      <Terminal className="w-4 h-4 mr-2" />
                      Step 4 of 4
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Generate Script
                      </h1>
                      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Your personalized setup script is ready to run in Terminal.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
                    <ScriptPreview
                      result={result}
                      isGenerating={isGenerating}
                      onRegenerate={generateScript}
                      onOptionsChange={updateOptions}
                    />
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
                    <ConfigSharing />
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={prevStep}
                      className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {language === 'tr' ? 'Geri' : 'Back'}
                    </button>
                  </div>
                </AnimatedContainer>
              )
            }
          </div >
        </main >

        {/* Keyboard Shortcuts Help Modal */}
        < KeyboardShortcutsHelp
          shortcuts={shortcutsWithKeys}
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      </PageTransition >
    </div >
  )
}

export default function SetupPage() {
  return (
    <SetupProvider>
      <SetupContent />
    </SetupProvider>
  )
}
