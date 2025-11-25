'use client'

import { useState } from 'react'
import { Copy, Download, Terminal, Check, AlertTriangle, Clock, Shield, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GenerationResult, ScriptGenerationOptions } from '@/lib/script-generator'

interface ScriptPreviewProps {
  result: GenerationResult | null
  isGenerating: boolean
  onRegenerate: () => void
  onOptionsChange: (options: ScriptGenerationOptions) => void
  className?: string
}

export function ScriptPreview({ 
  result, 
  isGenerating, 
  onRegenerate, 
  onOptionsChange,
  className 
}: ScriptPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<ScriptGenerationOptions>({
    includeComments: true,
    includeVerification: true,
    parallelInstalls: false,
    createBackup: false,
  })

  const handleCopy = async () => {
    if (!result?.script) return
    
    try {
      await navigator.clipboard.writeText(result.script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    if (!result?.script) return
    
    const blob = new Blob([result.script], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `macinitiate-setup-${new Date().toISOString().split('T')[0]}.sh`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleOptionChange = (key: keyof ScriptGenerationOptions, value: boolean) => {
    const newOptions = { ...options, [key]: value }
    setOptions(newOptions)
    onOptionsChange(newOptions)
  }

  const highlightSyntax = (code: string) => {
    return code
      .split('\n')
      .map((line, index) => {
        let className = 'font-mono text-sm'
        let content = line

        if (line.trim().startsWith('#')) {
          className += ' text-green-600 dark:text-green-400'
        }
        else if (line.trim().startsWith('if ') || line.trim().startsWith('then') || line.trim().startsWith('fi') || line.trim().startsWith('echo')) {
          className += ' text-blue-600 dark:text-blue-400 font-semibold'
        }
        else if (line.includes('brew install')) {
          className += ' text-purple-600 dark:text-purple-400 font-semibold'
        }
        else if (line.includes('defaults write') || line.includes('defaults delete')) {
          className += ' text-orange-600 dark:text-orange-400 font-semibold'
        }
        else if (line.includes('=')) {
          className += ' text-cyan-600 dark:text-cyan-400'
        }
        else {
          className += ' text-gray-700 dark:text-gray-300'
        }

        return (
          <div key={index} className={className}>
            {content || '\u00A0'}
          </div>
        )
      })
  }

  if (!result && !isGenerating) {
    return (
      <div className={cn("rounded-lg border border-border bg-card p-8 text-center", className)}>
        <Terminal className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Script Generated</h3>
        <p className="text-muted-foreground">
          Select apps and tweaks to generate your setup script.
        </p>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className={cn("rounded-lg border border-border bg-card p-8 text-center", className)}>
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Generating Script</h3>
        <p className="text-muted-foreground">
          Creating your personalized macOS setup script...
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Terminal className="h-5 w-5 mr-2" />
          Script Options
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeComments}
              onChange={(e) => handleOptionChange('includeComments', e.target.checked)}
              className="rounded border-border bg-background text-primary focus:ring-primary"
            />
            <span className="text-sm">Include comments</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeVerification}
              onChange={(e) => handleOptionChange('includeVerification', e.target.checked)}
              className="rounded border-border bg-background text-primary focus:ring-primary"
            />
            <span className="text-sm">Include verification</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.parallelInstalls}
              onChange={(e) => handleOptionChange('parallelInstalls', e.target.checked)}
              className="rounded border-border bg-background text-primary focus:ring-primary"
            />
            <span className="text-sm">Parallel installs</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.createBackup}
              onChange={(e) => handleOptionChange('createBackup', e.target.checked)}
              className="rounded border-border bg-background text-primary focus:ring-primary"
            />
            <span className="text-sm">Create backup</span>
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              <strong>Est. Time:</strong> {result?.estimatedTime || 0} min
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className={cn("h-4 w-4", result?.requiresSudo ? "text-orange-500" : "text-green-500")} />
            <span className="text-sm">
              <strong>Sudo:</strong> {result?.requiresSudo ? "Required" : "Not required"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <RotateCcw className={cn("h-4 w-4", result?.willRestart ? "text-orange-500" : "text-green-500")} />
            <span className="text-sm">
              <strong>Restart:</strong> {result?.willRestart ? "Required" : "Not required"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              <strong>Size:</strong> {result?.script?.split('\n').length || 0} lines
            </span>
          </div>
        </div>
      </div>

      {result?.errors && result.errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Errors ({result.errors.length})
          </h4>
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            {result.errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {result?.warnings && result.warnings.length > 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Warnings ({result.warnings.length})
          </h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            {result.warnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Generated Script</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRegenerate}
              className="inline-flex items-center px-3 py-1 text-sm border border-border rounded-md hover:bg-accent"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Regenerate
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-1 text-sm border border-border rounded-md hover:bg-accent"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 overflow-x-auto max-h-96 overflow-y-auto">
          {result?.script && highlightSyntax(result.script)}
        </div>
      </div>
    </div>
  )
}
