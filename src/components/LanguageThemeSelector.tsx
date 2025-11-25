'use client'

import { useState } from 'react'
import { Globe, Sun, Moon } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useTheme } from '@/contexts/theme-context'
import { useTranslation } from '@/lib/i18n'
import { AnimatedContainer, AnimatedButton } from '@/components/ui/motion'
import { cn } from '@/lib/utils'

export function LanguageThemeSelector() {
    const { language, setLanguage } = useLanguage()
    const { theme, setTheme } = useTheme()
    const { t } = useTranslation(language)

    const languages = [
        { code: 'en' as const, name: 'English', flag: '🇺🇸' },
        { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' },
    ]

    const currentLanguage = languages.find(l => l.code === language)

    const handleLanguageToggle = () => {
        const nextLanguage = language === 'en' ? 'tr' : 'en'
        setLanguage(nextLanguage)
    }

    const handleThemeToggle = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    const CurrentThemeIcon = theme === 'light' ? Sun : Moon

    return (
        <div className="flex items-center space-x-3">
            {/* Language Toggle Button */}
            <button
                onClick={handleLanguageToggle}
                className="flex items-center space-x-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent transition-colors"
                aria-label="Toggle language"
                title={`${currentLanguage?.flag} ${currentLanguage?.name} - Click to switch`}
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
                onClick={handleThemeToggle}
                className="flex items-center space-x-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent transition-colors"
                aria-label="Toggle theme"
                title={`${theme === 'light' ? 'Light' : 'Dark'} theme - Click to switch`}
            >
                <CurrentThemeIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>
        </div>
    )
}
