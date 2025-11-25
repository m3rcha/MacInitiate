'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Terminal, Package, Settings, Code, Keyboard } from 'lucide-react'
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
  AnimatedButton,
  AnimatedCard,
  PageTransition,
  transitions
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
                  <div className="space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight">{t.setup.welcome.title}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      {t.setup.welcome.description}
                    </p>
                  </div>
                </div>

                <AnimatedCard className="rounded-2xl border border-border bg-card p-8 shadow-lg">
                  <h2 className="mb-6 text-2xl font-semibold">{t.setup.welcome.whatWeSetup}</h2>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{t.setup.welcome.essentialApps}</h3>
                        <p className="text-sm text-muted-foreground">{t.setup.welcome.essentialAppsDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{t.setup.welcome.systemPreferences}</h3>
                        <p className="text-sm text-muted-foreground">{t.setup.welcome.systemPreferencesDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Terminal className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{t.setup.welcome.automationScript}</h3>
                        <p className="text-sm text-muted-foreground">{t.setup.welcome.automationScriptDesc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>

                <div className="flex justify-center pt-8">
                  <AnimatedButton>
                    <button
                      onClick={nextStep}
                      className="rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      {t.setup.welcome.getStarted}
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </button>
                  </AnimatedButton>
                </div>
              </AnimatedContainer>
            )}

            {/* Apps Step */}
            {currentStep === 'apps' && (
              <AnimatedContainer variant="slideUp" className="space-y-10">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">{t.setup.apps.title}</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t.setup.apps.description}
                  </p>
                </div>

                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                  <AppSelector
                    selectedApps={selectedApps}
                    onAppToggle={toggleApp}
                  />
                </div>

                <div className="flex justify-between items-center pt-8">
                  <AnimatedButton>
                    <button
                      onClick={prevStep}
                      className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t.common.back}
                    </button>
                  </AnimatedButton>
                  <AnimatedButton>
                    <button
                      onClick={nextStep}
                      className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      {t.common.continue}
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </button>
                  </AnimatedButton>
                </div>
              </AnimatedContainer>
            )}

            {/* Tweaks Step */}
            {currentStep === 'tweaks' && (
              <AnimatedContainer variant="slideUp" className="space-y-10">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">{t.setup.tweaks.title}</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t.setup.tweaks.description}
                  </p>
                </div>

                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                  <TweakSelector
                    selectedTweaks={selectedTweaks}
                    onTweakToggle={(tweakId) => toggleTweak(tweakId)}
                  />
                </div>

                <div className="flex justify-between items-center pt-8">
                  <AnimatedButton>
                    <button
                      onClick={prevStep}
                      className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t.common.back}
                    </button>
                  </AnimatedButton>
                  <AnimatedButton>
                    <button
                      onClick={nextStep}
                      className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      {t.common.continue}
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </button>
                  </AnimatedButton>
                </div>
              </AnimatedContainer>
            )}

            {/* Templates Step */}
            {currentStep === 'templates' && (
              <AnimatedContainer variant="slideUp" className="space-y-10">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">{t.setup.templates.title}</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t.setup.templates.description}
                  </p>
                </div>

                <AnimatedCard className="rounded-2xl border border-border bg-card p-12 text-center shadow-lg">
                  <div className="space-y-6">
                    <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">{t.setup.templates.comingSoon}</h2>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {t.setup.templates.comingSoonDesc}
                      </p>
                    </div>
                    <div className="pt-4">
                      <AnimatedButton>
                        <button
                          onClick={nextStep}
                          className="rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
                        >
                          {t.setup.templates.skipForNow}
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </button>
                      </AnimatedButton>
                    </div>
                  </div>
                </AnimatedCard>

                <div className="flex justify-between items-center pt-8">
                  <AnimatedButton>
                    <button
                      onClick={prevStep}
                      className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t.common.back}
                    </button>
                  </AnimatedButton>
                </div>
              </AnimatedContainer>
            )}

            {/* Generate Step */}
            {currentStep === 'generate' && (
              <AnimatedContainer variant="slideUp" className="space-y-10">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">{t.setup.generate.title}</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t.setup.generate.description}
                  </p>
                </div>

                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                  <ScriptPreview
                    result={result}
                    isGenerating={isGenerating}
                    onRegenerate={generateScript}
                    onOptionsChange={updateOptions}
                  />
                </div>

                {/* Configuration Sharing */}
                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                  <ConfigSharing />
                </div>

                {/* Navigation Actions */}
                <div className="flex justify-between items-center pt-8 border-t border-border">
                  <AnimatedButton>
                    <button
                      onClick={prevStep}
                      className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t.common.back}
                    </button>
                  </AnimatedButton>
                  <AnimatedButton>
                    <button
                      onClick={() => goToStep('welcome')}
                      className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      {t.common.startOver}
                    </button>
                  </AnimatedButton>
                </div>
              </AnimatedContainer>
            )}
          </div>
        </main>

        {/* Keyboard Shortcuts Help Modal */}
        <KeyboardShortcutsHelp
          shortcuts={shortcutsWithKeys}
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      </PageTransition>
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
