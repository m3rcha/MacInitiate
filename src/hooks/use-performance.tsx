'use client'

import { useEffect, useState } from 'react'

export function usePerformanceMetrics() {
    const [metrics, setMetrics] = useState({
        loadTime: 0,
        renderTime: 0,
        memoryUsage: 0
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        const startTime = performance.now()

        // Measure load time
        const measureLoadTime = () => {
            const loadTime = performance.now() - startTime
            setMetrics(prev => ({ ...prev, loadTime }))
        }

        // Measure memory usage if available
        const measureMemory = () => {
            if ('memory' in performance) {
                const memory = (performance as any).memory
                setMetrics(prev => ({
                    ...prev,
                    memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024)
                }))
            }
        }

        // Measure render time
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const renderEntries = entries.filter(entry => entry.name === 'render')
            if (renderEntries.length > 0) {
                const renderTime = renderEntries[renderEntries.length - 1].duration
                setMetrics(prev => ({ ...prev, renderTime }))
            }
        })

        observer.observe({ entryTypes: ['measure'] })

        // Initial measurements
        measureLoadTime()
        measureMemory()

        // Periodic memory measurement
        const interval = setInterval(measureMemory, 5000)

        return () => {
            observer.disconnect()
            clearInterval(interval)
        }
    }, [])

    return metrics
}

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export function useThrottle<T>(value: T, limit: number): T {
    const [throttledValue, setThrottledValue] = useState<T>(value)
    const lastRan = useState(Date.now())[0]

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
                setThrottledValue(value)
            }
        }, limit - (Date.now() - lastRan))

        return () => {
            clearTimeout(handler)
        }
    }, [value, limit, lastRan])

    return throttledValue
}
