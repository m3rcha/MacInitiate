'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
    fallback?: string
    wrapperClassName?: string
}

export function OptimizedImage({
    fallback = '/images/placeholder.png',
    wrapperClassName,
    className,
    alt,
    ...props
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    return (
        <div className={cn("relative overflow-hidden", wrapperClassName)}>
            {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            <Image
                {...props}
                className={cn(
                    "transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                alt={alt}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true)
                    setIsLoading(false)
                }}
                src={hasError ? fallback : props.src}
            />
        </div>
    )
}
