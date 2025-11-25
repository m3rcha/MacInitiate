'use client'

import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Lazy load heavy components
export const LazyScriptPreview = dynamic(
    () => import('@/components/ScriptPreview').then(mod => ({ default: mod.ScriptPreview })),
    {
        loading: () => <LoadingSpinner />,
        ssr: false
    }
)

export const LazyConfigSharing = dynamic(
    () => import('@/components/ConfigSharing').then(mod => ({ default: mod.ConfigSharing })),
    {
        loading: () => <LoadingSpinner />,
        ssr: false
    }
)

export const LazyKeyboardShortcutsHelp = dynamic(
    () => import('@/components/KeyboardShortcutsHelp').then(mod => ({ default: mod.KeyboardShortcutsHelp })),
    {
        loading: () => null,
        ssr: false
    }
)
