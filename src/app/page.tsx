'use client'

import Link from 'next/link'
import { Terminal, Zap, Shield, Cpu } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MacInitiate</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/setup"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex max-w-fit items-center justify-center rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
            <Zap className="mr-2 h-4 w-4" />
            Zero-config macOS setup in minutes, not hours
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            The Ultimate{' '}
            <span className="text-primary">&ldquo;Day 1&rdquo; macOS</span> Setup Tool
          </h1>

          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Transform hours of manual configuration into a single command. 
            Select your apps, customize system preferences, and generate the 
            perfect setup script for your Mac.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            >
              <Terminal className="mr-2 h-4 w-4" />
              Start Setup
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Development Templates</h3>
            <p className="text-sm text-muted-foreground">
              Pre-configured stacks for React Native, Python ML, DevOps, and more. 
              Includes language runtimes, tools, and project-specific settings.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Smart Resolution</h3>
            <p className="text-sm text-muted-foreground">
              Intelligent dependency management, conflict detection, and optimal 
              installation ordering for maximum success rate.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Configuration Sync</h3>
            <p className="text-sm text-muted-foreground">
              Cloud-based configuration management with version history, 
              team sharing, and cross-machine synchronization.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-lg bg-muted p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Ready to transform your Mac setup experience?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Join thousands of developers who&apos;ve reclaimed hours of their time.
          </p>
          <Link
            href="/setup"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            Start Your Setup - It&apos;s Free
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">MacInitiate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2025 MacInitiate. Built for developers, by developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
