'use client'

import { useState } from 'react'
import { X, Keyboard, ArrowLeft, ArrowRight, CornerUpLeft, Minimize } from 'lucide-react'
import { AnimatedContainer, AnimatedButton } from '@/components/ui/motion'

interface Shortcut {
    key: string
    keys: string
    description: string
}

interface KeyboardShortcutsHelpProps {
    shortcuts: Shortcut[]
    isOpen: boolean
    onClose: () => void
}

export function KeyboardShortcutsHelp({ shortcuts, isOpen, onClose }: KeyboardShortcutsHelpProps) {
    if (!isOpen) return null

    const getKeyIcon = (key: string) => {
        switch (key.toLowerCase()) {
            case 'arrowleft':
                return <ArrowLeft className="h-3 w-3" />
            case 'arrowright':
                return <ArrowRight className="h-3 w-3" />
            case 'enter':
                return <CornerUpLeft className="h-3 w-3" />
            case 'escape':
                return <Minimize className="h-3 w-3" />
            default:
                return <span className="text-xs font-mono">{key}</span>
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <AnimatedContainer variant="scale" className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Keyboard className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
                    </div>
                    <AnimatedButton>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 hover:bg-accent"
                            aria-label="Close keyboard shortcuts"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </AnimatedButton>
                </div>

                <div className="space-y-3">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                            <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                            <div className="flex items-center space-x-1">
                                {shortcut.keys.split(' + ').map((key, keyIndex) => (
                                    <div key={keyIndex} className="flex items-center">
                                        {keyIndex > 0 && <span className="mx-1 text-muted-foreground">+</span>}
                                        <div className="rounded border border-border bg-muted px-2 py-1 text-xs font-medium">
                                            {getKeyIcon(key)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                        Press <kbd className="px-1 py-0.5 text-xs bg-muted rounded border border-border">?</kbd> anytime to show this help
                    </p>
                </div>
            </AnimatedContainer>
        </div>
    )
}
