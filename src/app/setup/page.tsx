'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Terminal, Package, Settings, Code } from 'lucide-react'

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'apps' | 'tweaks' | 'templates' | 'generate'>('welcome')

  const steps = [
    { id: 'welcome', name: 'Welcome', icon: Terminal },
    { id: 'apps', name: 'Apps', icon: Package },
    { id: 'tweaks', name: 'System Tweaks', icon: Settings },
    { id: 'templates', name: 'Templates', icon: Code },
    { id: 'generate', name: 'Generate', icon: Terminal },
  ]

  const getStepIndex = (step: typeof currentStep) => steps.findIndex(s => s.id === step)
  const currentStepIndex = getStepIndex(currentStep)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MacInitiate Setup</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="border-b border-border bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex
              const Icon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                      ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                        isCompleted ? 'border-primary bg-primary text-primary-foreground' : 
                        'border-border bg-card text-muted-foreground'}
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:inline">
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-8 sm:w-16 h-0.5 bg-border mx-2 sm:mx-4" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {currentStep === 'welcome' && (
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold">Welcome to MacInitiate</h1>
              <p className="text-lg text-muted-foreground">
                Let&apos;s set up your Mac with the perfect combination of apps and system preferences.
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">200+ Apps</h3>
                  <p className="text-sm text-muted-foreground">
                    Curated development and productivity tools
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">System Tweaks</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimize macOS with expert configurations
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Code className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Dev Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-configured development environments
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Terminal className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">One Command</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate a single setup script
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep('apps')}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
              >
                Get Started
              </button>
            </div>
          )}

          {currentStep === 'apps' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Select Your Apps</h1>
                <p className="text-lg text-muted-foreground">
                  Choose from our curated collection of modern macOS applications.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">App Selection Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We&apos;re building a comprehensive catalog of 200+ curated apps.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentStep('tweaks')}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Tweaks
                  </button>
                  <button
                    onClick={() => setCurrentStep('welcome')}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'tweaks' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">System Preferences</h1>
                <p className="text-lg text-muted-foreground">
                  Fine-tune macOS for optimal productivity and workflow.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">System Tweaks Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Configure 100+ system preferences with expert-curated settings.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentStep('templates')}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Templates
                  </button>
                  <button
                    onClick={() => setCurrentStep('apps')}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'templates' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Development Templates</h1>
                <p className="text-lg text-muted-foreground">
                  Jump-start your development environment with pre-configured stacks.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Templates Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Choose from expert-curated development environment templates.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentStep('generate')}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Generate Setup Script
                  </button>
                  <button
                    onClick={() => setCurrentStep('tweaks')}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'generate' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Generate Your Setup Script</h1>
                <p className="text-lg text-muted-foreground">
                  Your personalized macOS setup script is ready.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <Terminal className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Script Generator Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Generate a optimized shell script with your selections.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentStep('welcome')}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Start Over
                  </button>
                  <button
                    onClick={() => setCurrentStep('templates')}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
