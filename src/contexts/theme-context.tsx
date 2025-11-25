'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark')

    // Auto-detect system theme on first load only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check for saved preference first
            const saved = localStorage.getItem('macinitiate-theme') as Theme
            if (saved && ['light', 'dark'].includes(saved)) {
                setThemeState(saved)
            } else {
                // Auto-detect system preference on first load only
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                setThemeState(systemTheme)
                // Save the auto-detected preference
                localStorage.setItem('macinitiate-theme', systemTheme)
            }
        }
    }, [])

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
        if (typeof window !== 'undefined') {
            localStorage.setItem('macinitiate-theme', newTheme)
        }
    }

    // Apply theme to document
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement
            root.classList.remove('light', 'dark')
            root.classList.add(theme)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
