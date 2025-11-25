import type { Tweak } from '@/types/common'

export interface SetupConfiguration {
    apps: string[]
    tweaks: Record<string, boolean | string | number | null>
    timestamp: number
    version: string
}

export class ConfigSharing {
    // Encode configuration to URL-safe base64
    static encodeConfig(config: SetupConfiguration): string {
        try {
            const json = JSON.stringify(config)
            const base64 = btoa(json)
            // Make it URL-safe
            return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
        } catch (error) {
            console.error('Failed to encode configuration:', error)
            return ''
        }
    }

    // Decode configuration from URL-safe base64
    static decodeConfig(encoded: string): SetupConfiguration | null {
        try {
            // Restore base64 padding
            let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
            while (base64.length % 4) {
                base64 += '='
            }

            const json = atob(base64)
            return JSON.parse(json)
        } catch (error) {
            console.error('Failed to decode configuration:', error)
            return null
        }
    }

    // Generate shareable URL
    static generateShareableUrl(config: SetupConfiguration): string {
        const encoded = this.encodeConfig(config)
        if (!encoded) return ''

        const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
        return `${baseUrl}/setup?config=${encoded}`
    }

    // Extract configuration from URL
    static extractConfigFromUrl(): SetupConfiguration | null {
        if (typeof window === 'undefined') return null

        const params = new URLSearchParams(window.location.search)
        const encoded = params.get('config')

        if (!encoded) return null

        return this.decodeConfig(encoded)
    }

    // Download configuration as JSON file
    static downloadAsJson(config: SetupConfiguration, filename?: string): void {
        if (typeof window === 'undefined') return

        const json = JSON.stringify(config, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = filename || `macinitiate-config-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    // Import configuration from JSON file
    static importFromJson(file: File): Promise<SetupConfiguration> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                try {
                    const json = event.target?.result as string
                    const config = JSON.parse(json)

                    // Validate configuration structure
                    if (!this.validateConfig(config)) {
                        reject(new Error('Invalid configuration file'))
                        return
                    }

                    resolve(config)
                } catch (error) {
                    reject(error)
                }
            }

            reader.onerror = () => reject(new Error('Failed to read file'))
            reader.readAsText(file)
        })
    }

    // Validate configuration structure
    static validateConfig(config: any): config is SetupConfiguration {
        return (
            typeof config === 'object' &&
            config !== null &&
            Array.isArray(config.apps) &&
            typeof config.tweaks === 'object' &&
            typeof config.timestamp === 'number' &&
            typeof config.version === 'string'
        )
    }

    // Create configuration from current state
    static createFromState(
        selectedApps: string[],
        selectedTweaks: Record<string, boolean | string | number | null>
    ): SetupConfiguration {
        return {
            apps: selectedApps,
            tweaks: selectedTweaks,
            timestamp: Date.now(),
            version: '1.0.0'
        }
    }

    // Copy shareable URL to clipboard
    static async copyShareableUrl(config: SetupConfiguration): Promise<boolean> {
        if (typeof window === 'undefined') return false

        try {
            const url = this.generateShareableUrl(config)
            await navigator.clipboard.writeText(url)
            return true
        } catch (error) {
            console.error('Failed to copy URL:', error)
            return false
        }
    }

    // Generate social sharing text
    static generateShareText(config: SetupConfiguration): string {
        const appCount = config.apps.length
        const tweakCount = Object.keys(config.tweaks).length

        return `Just set up my Mac with ${appCount} apps and ${tweakCount} system tweaks using MacInitiate! 🚀`
    }

    // Generate Twitter sharing URL
    static generateTwitterUrl(config: SetupConfiguration, setupUrl: string): string {
        const text = this.generateShareText(config)
        const encodedText = encodeURIComponent(text)
        const encodedUrl = encodeURIComponent(setupUrl)

        return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    }

    // Generate LinkedIn sharing URL
    static generateLinkedInUrl(config: SetupConfiguration, setupUrl: string): string {
        const text = this.generateShareText(config)
        const encodedText = encodeURIComponent(text)
        const encodedUrl = encodeURIComponent(setupUrl)

        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`
    }

    // Update URL with configuration (for template sharing)
    static updateUrlWithConfig(config: SetupConfiguration): void {
        if (typeof window === 'undefined') return

        const encoded = this.encodeConfig(config)
        const url = new URL(window.location.href)
        url.searchParams.set('config', encoded)

        window.history.replaceState({}, '', url.toString())
    }

    // Clear configuration from URL
    static clearConfigFromUrl(): void {
        if (typeof window === 'undefined') return

        const url = new URL(window.location.href)
        url.searchParams.delete('config')

        window.history.replaceState({}, '', url.toString())
    }
}
