'use client'

import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
    key: string
    ctrlKey?: boolean
    metaKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    action: () => void
    description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        for (const shortcut of shortcuts) {
            const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
            const ctrlMatches = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey
            const metaMatches = shortcut.metaKey ? event.metaKey : !event.metaKey
            const shiftMatches = shortcut.shiftKey ? event.shiftKey : !event.shiftKey
            const altMatches = shortcut.altKey ? event.altKey : !event.altKey

            if (keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches) {
                event.preventDefault()
                event.stopPropagation()
                shortcut.action()
                break
            }
        }
    }, [shortcuts])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    return shortcuts.map(s => ({
        ...s,
        keys: [
            s.ctrlKey && 'Ctrl',
            s.metaKey && 'Cmd',
            s.altKey && 'Alt',
            s.shiftKey && 'Shift',
            s.key.toUpperCase()
        ].filter(Boolean).join(' + ')
    }))
}

// Common shortcuts for the app
export const commonShortcuts = {
    nextStep: { key: 'ArrowRight', action: () => { }, description: 'Go to next step' },
    prevStep: { key: 'ArrowLeft', action: () => { }, description: 'Go to previous step' },
    submit: { key: 'Enter', action: () => { }, description: 'Submit/Continue' },
    escape: { key: 'Escape', action: () => { }, description: 'Cancel/Go back' },
    copy: { key: 'c', ctrlKey: true, action: () => { }, description: 'Copy to clipboard' },
    help: { key: '?', action: () => { }, description: 'Show keyboard shortcuts' }
}
