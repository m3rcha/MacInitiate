'use client'

import React from 'react'
import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { LanguageThemeSelector } from '@/components/LanguageThemeSelector'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="h-6 w-6 text-gray-900 dark:text-white" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">MacInitiate</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageThemeSelector />
              <Link
                href="/setup"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Start Setup
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                  MacInitiate
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Set up your Mac with one command
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/setup"
                  className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Start Setup
                </Link>
                
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  Choose your developer role • Install apps • Configure system
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Developer Roles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">15+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Essential Apps</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10min</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
