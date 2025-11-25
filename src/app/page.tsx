'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Terminal,
  Zap,
  Shield,
  Cpu,
  ArrowRight,
  CheckCircle,
  Package,
  Settings,
  Code,
  Sparkles,
  ChevronRight,
  Play,
  Clock,
  Users,
  Star,
  Command,
  Zap as Lightning,
  Check,
  Lock,
  Monitor,
  Smartphone,
  Download,
  Copy,
} from 'lucide-react'
import {
  AnimatedContainer,
  AnimatedButton,
  AnimatedCard,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/motion'
import { LanguageThemeSelector } from '@/components/LanguageThemeSelector'
import { useLanguage } from '@/contexts/language-context'
import { useTranslation } from '@/lib/i18n'

export default function Home() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [terminalLine, setTerminalLine] = useState(0)
  const [showStats, setShowStats] = useState(false)

  // Terminal animation content
  const terminalContent = [
    { text: "$ macinitiate setup", type: "command" },
    { text: "🔍 Scanning your Mac for existing tools...", type: "output" },
    { text: "✅ Found Homebrew installation", type: "success" },
    { text: "📦 Installing curated development stack...", type: "output" },
    { text: "   • VS Code with extensions", type: "progress" },
    { text: "   • Node.js LTS + Yarn", type: "progress" },
    { text: "   • Docker Desktop", type: "progress" },
    { text: "⚙️  Applying system optimizations...", type: "output" },
    { text: "   • Show hidden files in Finder", type: "progress" },
    { text: "   • Enable key repeat", type: "progress" },
    { text: "   • Optimize Dock appearance", type: "progress" },
    { text: "🎉 Setup complete! Your Mac is optimized for development.", type: "success" },
    { text: "", type: "cursor" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalLine((prev) => (prev + 1) % terminalContent.length)
    }, 800)
    return () => clearInterval(interval)
  }, [terminalContent.length])

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-mono">
      {/* Beta Notice Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-orange-200/20 dark:border-orange-700/20">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/20 rounded-full border border-orange-200 dark:border-orange-700/50">
              <Terminal className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                {language === 'tr'
                  ? 'MacInitiate BETA sürümündedir - Kendi riskinizle kullanın, çalışmayabilir'
                  : 'MacInitiate is in BETA - Use at your own risk as it may break'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Navigation */}
      <AnimatedContainer variant="slideDown">
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Terminal className="h-8 w-8 text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      MacInitiate
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-md border border-orange-200 dark:border-orange-700">
                      BETA
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <LanguageThemeSelector />
                <AnimatedButton>
                  <Link
                    href="/setup"
                    className="group inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Terminal className="mr-2 h-4 w-4" />
                    Start Setup
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </nav>
      </AnimatedContainer>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <AnimatedContainer variant="slideUp" delay={0.1}>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-700 dark:text-green-300 mb-6 border border-green-200 dark:border-green-700">
                    <Terminal className="w-4 h-4 mr-2" />
                    Live Setup Demonstration
                  </div>
                </AnimatedContainer>

                <AnimatedContainer variant="slideUp" delay={0.2}>
                  <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    {language === 'tr' ? 'Kurulum Saatlerini' : 'Turn Hours of Setup'}
                    <span className="block text-blue-600 dark:text-blue-400">
                      {language === 'tr' ? 'Dakikalara Dönüştür' : 'Into Minutes'}
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mt-8 max-w-xl leading-relaxed">
                    {language === 'tr'
                      ? 'Araçlarınızı seçin, sistem tercihlerinizi özelleştirin ve Mac\'inizi üretkenlik gücü haline getiren tek bir komut alın.'
                      : 'Select your tools, customize system preferences, and get one command to transform your Mac into a productivity powerhouse.'
                    }
                  </p>
                </AnimatedContainer>

                <AnimatedContainer variant="slideUp" delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <AnimatedButton>
                      <Link
                        href="/setup"
                        className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105"
                      >
                        <Terminal className="mr-3 h-5 w-5" />
                        {language === 'tr' ? 'Kurulumunuzu Başlatın' : 'Start Your Setup'}
                        <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton>
                      <button className="group inline-flex items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                        <Play className="mr-3 h-5 w-5" />
                        Watch Demo
                        <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </AnimatedButton>
                  </div>
                </AnimatedContainer>

                {/* Trust Indicators */}
                <AnimatedContainer variant="fadeIn" delay={0.4}>
                  <div className="grid grid-cols-3 gap-8 pt-12 max-w-lg">
                    {showStats && (
                      <>
                        <div className="text-center group">
                          <div className="text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 group-hover:scale-110">
                            <Counter end={15} duration={2000} />
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            Minutes
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            Average Setup
                          </div>
                        </div>
                        <div className="text-center group">
                          <div className="text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 group-hover:scale-110">
                            <Counter end={250} duration={2500} />
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            Tools
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            Curated & Tested
                          </div>
                        </div>
                        <div className="text-center group">
                          <div className="text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 group-hover:scale-110">
                            <Counter end={100} duration={3000} />
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            %
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            Free Forever
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </AnimatedContainer>
              </div>

              {/* Right Column - Terminal Animation */}
              <AnimatedContainer variant="slideUp" delay={0.5}>
                <div className="relative">
                  <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700/50">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">MacInitiate Setup</div>
                    </div>

                    {/* Terminal Content */}
                    <div className="space-y-1 font-mono text-sm min-h-[400px]">
                      {terminalContent.slice(0, terminalLine + 1).map((line, index) => (
                        <div
                          key={index}
                          className={`${line.type === 'command'
                            ? 'text-green-400'
                            : line.type === 'success'
                              ? 'text-green-400'
                              : line.type === 'progress'
                                ? 'text-slate-300 pl-4'
                                : line.type === 'cursor'
                                  ? 'text-green-400 animate-pulse'
                                  : 'text-slate-300'
                            }`}
                        >
                          {line.text}
                          {line.type === 'cursor' && <span className="animate-pulse">█</span>}
                        </div>
                      ))}
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg animate-bounce">
                      Live Demo
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 -z-10"></div>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <AnimatedContainer variant="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                From development tools to system preferences, we handle it all
              </p>
            </div>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">250+</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Curated Apps</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Hand-picked applications across development, design, productivity, and more.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Version-controlled installations
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Dependency auto-resolution
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  macOS compatibility verified
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="group p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">86+</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">System Tweaks</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Expert system preferences for Dock, Finder, Security, and Performance.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Safety-rated configurations
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  macOS version compatibility
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  One-click application
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Terminal className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">1</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Command</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Generate one copy-paste command that handles everything automatically.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Syntax-highlighted preview
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Download as executable script
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Error handling built-in
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.03%27%3E%3Ccircle cx=%2730%27 cy=%2730%27 r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedContainer variant="fadeIn">
            <AnimatedCard className="rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 p-16 text-center shadow-2xl">
              <div className="relative max-w-4xl mx-auto space-y-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto shadow-xl">
                  <Terminal className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Ready to Transform Your Setup?
                  </h2>
                  <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Join thousands of developers who've turned hours of tedious setup into minutes of productivity.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                  <AnimatedButton>
                    <Link
                      href="/setup"
                      className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-12 py-5 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105"
                    >
                      <Terminal className="mr-3 h-6 w-6" />
                      Start Your Setup
                      <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </AnimatedButton>
                  <AnimatedButton>
                    <button className="group inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-12 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
                      <Download className="mr-3 h-6 w-6" />
                      Download Demo
                      <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </AnimatedButton>
                </div>
                <div className="flex items-center justify-center space-x-12 text-sm text-blue-200">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-400" />
                    Secure & Tested
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-400" />
                    5-Minute Setup
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-400" />
                    10,000+ Happy Devs
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </AnimatedContainer>
        </div>
      </section >

      {/* Footer */}
      < footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3">
              <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-semibold text-slate-900 dark:text-white">MacInitiate</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
              <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Docs</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-slate-500 dark:text-slate-500">
            © 2025 MacInitiate. Built for macOS developers.
          </div>
        </div>
      </footer >
    </div >
  )
}

// Counter component for animated numbers
function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return <>{count}</>
}
