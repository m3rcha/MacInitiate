'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'tr'

interface LanguageContextType {
    language: Language
    setLanguage: (language: Language) => void
    isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')

    // Auto-detect language on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check for saved preference first
            const saved = localStorage.getItem('macinitiate-language') as Language
            if (saved && ['en', 'tr'].includes(saved)) {
                setLanguageState(saved)
            } else {
                // Auto-detect browser language
                const browserLang = navigator.language.toLowerCase()
                if (browserLang.startsWith('tr')) {
                    setLanguageState('tr')
                } else {
                    setLanguageState('en')
                }
            }
        }
    }, [])

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage)
        if (typeof window !== 'undefined') {
            localStorage.setItem('macinitiate-language', newLanguage)
        }
    }

    const isRTL = false // Turkish is not RTL, but keeping for future languages

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
