import type { App } from '@/types/apps'
import type { SystemTweak } from '@/types/tweaks'
import { APPS } from '@/data/apps'
import { SYSTEM_TWEAKS, generateTweakCommand } from '@/data/tweaks'

export interface ScriptGenerationOptions {
    includeComments: boolean
    includeVerification: boolean
    parallelInstalls: boolean
    createBackup: boolean
}

export interface GenerationResult {
    script: string
    errors: string[]
    warnings: string[]
    estimatedTime: number
    requiresSudo: boolean
    willRestart: boolean
}

export class ScriptGenerator {
    private options: ScriptGenerationOptions

    constructor(options: Partial<ScriptGenerationOptions> = {}) {
        this.options = {
            includeComments: true,
            includeVerification: true,
            parallelInstalls: false,
            createBackup: false,
            ...options,
        }
    }

    generateScript(selectedAppIds: string[], selectedTweakIds: Record<string, boolean | string | number | null>): GenerationResult {
        const errors: string[] = []
        const warnings: string[] = []
        const scriptLines: string[] = []

        // Header
        if (this.options.includeComments) {
            scriptLines.push('#!/bin/bash')
            scriptLines.push('set -e')
            scriptLines.push('')
            scriptLines.push('# MacInitiate Generated Setup Script')
            scriptLines.push(`# Generated on ${new Date().toISOString()}`)
            scriptLines.push(`# ${selectedAppIds.length} apps, ${Object.keys(selectedTweakIds).length} system tweaks`)
            scriptLines.push('')
        }

        // Validation
        const validation = this.validateSelections(selectedAppIds, selectedTweakIds)
        errors.push(...validation.errors)
        warnings.push(...validation.warnings)

        if (errors.length > 0) {
            scriptLines.push('# ERROR: Cannot generate script due to validation errors')
            errors.forEach(error => scriptLines.push(`# ${error}`))
            return {
                script: scriptLines.join('\n'),
                errors,
                warnings,
                estimatedTime: 0,
                requiresSudo: false,
                willRestart: false,
            }
        }

        // Pre-installation checks
        if (this.options.includeComments) {
            scriptLines.push('# Pre-installation checks')
        }
        scriptLines.push('if ! command -v brew &> /dev/null; then')
        scriptLines.push('  echo "Installing Homebrew..."')
        scriptLines.push('  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"')
        scriptLines.push('fi')
        scriptLines.push('')

        // Backup
        if (this.options.createBackup) {
            if (this.options.includeComments) {
                scriptLines.push('# Creating backup of existing configurations')
            }
            scriptLines.push('BACKUP_DIR="$HOME/macinitiate-backup-$(date +%Y%m%d-%H%M%S)"')
            scriptLines.push('mkdir -p "$BACKUP_DIR"')
            scriptLines.push('')
        }

        // Install apps
        const apps = this.resolveAndOrderApps(selectedAppIds)
        if (apps.length > 0) {
            if (this.options.includeComments) {
                scriptLines.push('# Install Applications')
            }

            if (this.options.parallelInstalls) {
                scriptLines.push(`brew install --cask ${apps.map(app => app.packageId).join(' ')}`)
            } else {
                apps.forEach(app => {
                    scriptLines.push(`brew install --cask ${app.packageId}`)
                })
            }
            scriptLines.push('')
        }

        // Apply system tweaks
        const tweaks = this.resolveTweaks(selectedTweakIds)
        if (tweaks.length > 0) {
            if (this.options.includeComments) {
                scriptLines.push('# Apply System Preferences')
            }

            tweaks.forEach(tweak => {
                const value = selectedTweakIds[tweak.id]
                const command = generateTweakCommand(tweak.id, value)
                scriptLines.push(`# ${tweak.name}`)
                scriptLines.push(`# ${tweak.description}`)
                if (tweak.warning) {
                    scriptLines.push(`# WARNING: ${tweak.warning}`)
                }
                scriptLines.push(command)
                scriptLines.push('')
            })
        }

        // Verification
        if (this.options.includeVerification) {
            if (this.options.includeComments) {
                scriptLines.push('# Verification')
            }
            scriptLines.push('echo "Verifying installations..."')
            apps.forEach(app => {
                scriptLines.push(`if ! brew list --cask ${app.packageId} &> /dev/null; then`)
                scriptLines.push(`  echo "WARNING: ${app.name} may not have installed correctly"`)
                scriptLines.push('fi')
            })
            scriptLines.push('')
        }

        // Cleanup and final message
        if (this.options.includeComments) {
            scriptLines.push('# Setup complete')
        }
        scriptLines.push('echo "Setup complete! Restart your machine to apply all changes."')

        const willRestart = tweaks.some(tweak => tweak.requiresRestart)
        const requiresSudo = tweaks.some(tweak => tweak.requiresSudo)
        const estimatedTime = this.calculateEstimatedTime(apps, tweaks)

        return {
            script: scriptLines.join('\n'),
            errors,
            warnings,
            estimatedTime,
            requiresSudo,
            willRestart,
        }
    }

    private validateSelections(appIds: string[], tweakIds: Record<string, boolean | string | number | null>) {
        const errors: string[] = []
        const warnings: string[] = []

        // Validate apps
        appIds.forEach(appId => {
            const app = APPS.find(a => a.id === appId)
            if (!app) {
                errors.push(`Unknown app ID: ${appId}`)
            }
        })

        // Validate tweaks
        Object.keys(tweakIds).forEach(tweakId => {
            const tweak = SYSTEM_TWEAKS.find(t => t.id === tweakId)
            if (!tweak) {
                errors.push(`Unknown tweak ID: ${tweakId}`)
            } else {
                if (tweak.requiresSudo) {
                    warnings.push(`Tweak "${tweak.name}" requires sudo privileges`)
                }
                if (tweak.warning) {
                    warnings.push(`Tweak "${tweak.name}": ${tweak.warning}`)
                }
            }
        })

        // Check for conflicts
        const selectedApps = appIds.map(id => APPS.find(a => a.id === id)).filter(Boolean) as App[]
        const conflicts = this.detectConflicts(selectedApps)
        conflicts.forEach(conflict => {
            warnings.push(`App conflict detected: ${conflict.app1.name} and ${conflict.app2.name}`)
        })

        return { errors, warnings }
    }

    private resolveAndOrderApps(appIds: string[]): App[] {
        const apps = appIds.map(id => APPS.find(a => a.id === id)).filter(Boolean) as App[]

        // Sort by install order, then by dependencies
        return apps.sort((a, b) => {
            if (a.installOrder !== b.installOrder) {
                return a.installOrder - b.installOrder
            }

            // Basic dependency resolution - apps with dependencies go later
            if (a.dependencies.length > 0 && b.dependencies.length === 0) return 1
            if (a.dependencies.length === 0 && b.dependencies.length > 0) return -1

            return a.name.localeCompare(b.name)
        })
    }

    private resolveTweaks(tweakIds: Record<string, boolean | string | number | null>): SystemTweak[] {
        return Object.keys(tweakIds)
            .map(id => SYSTEM_TWEAKS.find(t => t.id === id))
            .filter(Boolean) as SystemTweak[]
    }

    private detectConflicts(apps: App[]): { app1: App; app2: App }[] {
        const conflicts: { app1: App; app2: App }[] = []

        for (let i = 0; i < apps.length; i++) {
            for (let j = i + 1; j < apps.length; j++) {
                const app1 = apps[i]
                const app2 = apps[j]

                if (app1.conflictsWith.includes(app2.id) || app2.conflictsWith.includes(app1.id)) {
                    conflicts.push({ app1, app2 })
                }
            }
        }

        return conflicts
    }

    private calculateEstimatedTime(apps: App[], tweaks: SystemTweak[]): number {
        // Rough estimation in minutes
        const appTime = apps.length * 2 // 2 minutes per app average
        const tweakTime = tweaks.length * 0.5 // 30 seconds per tweak
        return Math.ceil(appTime + tweakTime)
    }
}
