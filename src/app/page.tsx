'use client'

import Link from 'next/link'
import { Terminal, Zap, Shield, Cpu, ArrowRight, CheckCircle, Package, Settings, Code } from 'lucide-react'
import {
  AnimatedContainer,
  AnimatedButton,
  AnimatedCard,
  StaggerContainer,
  StaggerItem,
  transitions
} from '@/components/ui/motion'
import { LanguageThemeSelector } from '@/components/LanguageThemeSelector'
import { useLanguage } from '@/contexts/language-context'
import { useTranslation } from '@/lib/i18n'

export default function Home() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <AnimatedContainer variant="slideDown">
        <nav className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MacInitiate</span>
              </div>
              <div className="flex items-center space-x-6">
                <LanguageThemeSelector />
                <AnimatedButton>
                  <Link
                    href="/setup"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    {t.landing.hero.getStarted}
                  </Link>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </nav>
      </AnimatedContainer>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          <AnimatedContainer variant="fadeIn" delay={0.1}>
            <div className="mx-auto flex max-w-fit items-center justify-center rounded-full bg-primary/10 border border-primary/20 px-6 py-3 text-sm text-primary font-medium">
              <Zap className="mr-2 h-4 w-4" />
              {t.landing.hero.subtitle}
            </div>
          </AnimatedContainer>

          <AnimatedContainer variant="slideUp" delay={0.2}>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              {t.landing.hero.title}
            </h1>
            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t.landing.hero.description}
            </p>
          </AnimatedContainer>

          <AnimatedContainer variant="slideUp" delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <AnimatedButton>
                <Link
                  href="/setup"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:scale-105"
                >
                  <Terminal className="mr-2 h-5 w-5" />
                  {t.landing.hero.getStarted}
                </Link>
              </AnimatedButton>
              <AnimatedButton>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-8 py-4 text-base font-medium shadow-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-lg"
                >
                  {t.landing.hero.viewDemo}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </AnimatedButton>
            </div>
          </AnimatedContainer>
        </div>

        {/* Stats Section */}
        <AnimatedContainer variant="fadeIn" delay={0.5}>
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.landing.stats.apps}</div>
                <div className="text-sm text-muted-foreground">{t.landing.stats.labels.applications}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.landing.stats.tweaks}</div>
                <div className="text-sm text-muted-foreground">{t.landing.stats.labels.systemTweaks}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.landing.stats.timeSaved}</div>
                <div className="text-sm text-muted-foreground">{t.landing.stats.labels.setupTime}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.landing.stats.success}</div>
                <div className="text-sm text-muted-foreground">{t.landing.stats.labels.successRate}</div>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Features Section */}
        <section id="features" className="mt-24">
          <AnimatedContainer variant="fadeIn" delay={0.6}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t.landing.features.sectionTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.landing.features.sectionDescription}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <AnimatedCard className="rounded-2xl border border-border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t.landing.features.apps.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.landing.features.apps.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.apps.items.devTools}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.apps.items.productivity}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.apps.items.security}
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="rounded-2xl border border-border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t.landing.features.tweaks.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.landing.features.tweaks.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.tweaks.items.dock}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.tweaks.items.finder}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.tweaks.items.security}
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="rounded-2xl border border-border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t.landing.features.generator.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.landing.features.generator.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.generator.items.singleCommand}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.generator.items.customizable}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {t.landing.features.generator.items.errorHandling}
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* How It Works Section */}
        <section className="mt-24">
          <AnimatedContainer variant="fadeIn" delay={1.0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t.landing.howItWorks.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.landing.howItWorks.description}
              </p>
            </div>
          </AnimatedContainer>

          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedContainer variant="slideUp" delay={1.1}>
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <div className="text-lg font-semibold mb-3">1. {t.landing.howItWorks.steps.select}</div>
                <p className="text-muted-foreground text-sm">
                  {t.landing.howItWorks.steps.descriptions.select}
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer variant="slideUp" delay={1.2}>
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <div className="text-lg font-semibold mb-3">2. {t.landing.howItWorks.steps.customize}</div>
                <p className="text-muted-foreground text-sm">
                  {t.landing.howItWorks.steps.descriptions.customize}
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer variant="slideUp" delay={1.3}>
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <div className="text-lg font-semibold mb-3">3. {t.landing.howItWorks.steps.generate}</div>
                <p className="text-muted-foreground text-sm">
                  {t.landing.howItWorks.steps.descriptions.generate}
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer variant="slideUp" delay={1.4}>
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Terminal className="h-8 w-8 text-primary" />
                </div>
                <div className="text-lg font-semibold mb-3">4. {t.landing.howItWorks.steps.deploy}</div>
                <p className="text-muted-foreground text-sm">
                  {t.landing.howItWorks.steps.descriptions.deploy}
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24">
          <AnimatedContainer variant="fadeIn" delay={1.5}>
            <AnimatedCard className="rounded-3xl border border-border bg-gradient-to-r from-primary/5 to-primary/10 p-12 text-center shadow-xl">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t.landing.cta.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.landing.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <AnimatedButton>
                    <Link
                      href="/setup"
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:scale-105"
                    >
                      <Terminal className="mr-2 h-5 w-5" />
                      {t.landing.hero.getStarted}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedCard>
          </AnimatedContainer>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">MacInitiate</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 MacInitiate. Built with ❤️ for macOS developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
