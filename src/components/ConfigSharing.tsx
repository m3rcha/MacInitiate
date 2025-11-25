'use client'

import { useState, useRef } from 'react'
import { Share2, Download, Upload, Copy, Check, Link, FileJson } from 'lucide-react'
import { AnimatedContainer, AnimatedButton } from '@/components/ui/motion'
import { ConfigSharing as ConfigSharingUtils, SetupConfiguration } from '@/lib/config-sharing'
import { useAppSelection, useTweakSelection } from '@/lib/setup-state'
import { APPS } from '@/data/apps'
import type { App as AppType } from '@/types/common'
import { cn } from '@/lib/utils'

interface ConfigSharingProps {
    className?: string
}

export function ConfigSharing({ className }: ConfigSharingProps) {
    const { selectedApps } = useAppSelection()
    const { selectedTweaks } = useTweakSelection()
    const [copied, setCopied] = useState(false)
    const [importing, setImporting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const currentConfig = ConfigSharingUtils.createFromState(selectedApps, selectedTweaks)

    const handleCopyUrl = async () => {
        const success = await ConfigSharingUtils.copyShareableUrl(currentConfig)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleDownloadJson = () => {
        ConfigSharingUtils.downloadAsJson(currentConfig)
    }

    const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setImporting(true)
        try {
            const config = await ConfigSharingUtils.importFromJson(file)

            // Here you would typically dispatch actions to update the state
            // For now, we'll just reload the page with the configuration in the URL
            const encoded = ConfigSharingUtils.encodeConfig(config)
            const url = `${window.location.pathname}?config=${encoded}`
            window.location.href = url
        } catch (error) {
            console.error('Failed to import configuration:', error)
            alert('Failed to import configuration. Please check the file format.')
        } finally {
            setImporting(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const shareableUrl = ConfigSharingUtils.generateShareableUrl(currentConfig)

    return (
        <AnimatedContainer variant="slideUp" className={cn("space-y-6", className)}>
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Share2 className="h-5 w-5 mr-2 text-primary" />
                    Share Configuration
                </h3>

                {/* Share URL Section */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Shareable Link</label>
                        <div className="flex gap-2">
                            <div className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-mono truncate">
                                {shareableUrl}
                            </div>
                            <AnimatedButton>
                                <button
                                    onClick={handleCopyUrl}
                                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </AnimatedButton>
                        </div>
                    </div>

                    {/* Download/Import Section */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <AnimatedButton>
                            <button
                                onClick={handleDownloadJson}
                                className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent flex items-center justify-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download JSON
                            </button>
                        </AnimatedButton>

                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json"
                                onChange={handleImportJson}
                                className="hidden"
                                id="import-config"
                            />
                            <AnimatedButton>
                                <label
                                    htmlFor="import-config"
                                    className={cn(
                                        "w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent flex items-center justify-center gap-2 cursor-pointer",
                                        importing && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <Upload className="h-4 w-4" />
                                    {importing ? 'Importing...' : 'Import JSON'}
                                </label>
                            </AnimatedButton>
                        </div>
                    </div>
                </div>

                {/* Configuration Summary */}
                <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-medium mb-3">Configuration Summary</h4>
                    <div className="grid gap-3 sm:grid-cols-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-muted-foreground">Apps:</span>
                            <span className="font-medium">{selectedApps.length} selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-muted-foreground">Tweaks:</span>
                            <span className="font-medium">{Object.keys(selectedTweaks).length} configured</span>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-4 p-4 rounded-lg bg-muted text-xs text-muted-foreground">
                    <p className="mb-2">
                        <strong>Share Link:</strong> Send the link to others to load your exact configuration.
                    </p>
                    <p className="mb-2">
                        <strong>JSON Export:</strong> Save your configuration locally for backup or sharing.
                    </p>
                    <p>
                        <strong>JSON Import:</strong> Load a previously saved configuration file.
                    </p>
                </div>
            </div>
        </AnimatedContainer>
    )
}
