'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Animation variants
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}

export const slideUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
}

export const slideDown = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 15 }
}

export const slideLeft = {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -15 }
}

export const slideRight = {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 15 }
}

export const scale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
}

// Transition presets
export const transitions = {
    smooth: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
    bouncy: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] as const },
    slow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    fast: { duration: 0.12, ease: [0.4, 0, 0.2, 1] as const },
    subtle: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }
}

// Animated container components
interface AnimatedContainerProps {
    children: ReactNode
    className?: string
    variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale'
    transition?: any
    delay?: number
}

export function AnimatedContainer({
    children,
    className,
    variant = 'fadeIn',
    transition = transitions.smooth,
    delay = 0
}: AnimatedContainerProps) {
    const variants = {
        fadeIn,
        slideUp,
        slideDown,
        slideLeft,
        slideRight,
        scale
    }

    return (
        <motion.div
            className={className}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants[variant]}
            transition={{ ...transition, delay }}
        >
            {children}
        </motion.div>
    )
}

// Stagger animation for lists
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale'
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    variant = 'slideUp'
}: StaggerContainerProps) {
    const variants = {
        fadeIn,
        slideUp,
        slideDown,
        slideLeft,
        slideRight,
        scale
    }

    return (
        <motion.div
            className={className}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: {},
                animate: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                },
                exit: {}
            }}
        >
            {children}
        </motion.div>
    )
}

interface StaggerItemProps {
    children: ReactNode
    className?: string
    variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale'
    transition?: any
}

export function StaggerItem({
    children,
    className,
    variant = 'slideUp',
    transition = transitions.smooth
}: StaggerItemProps) {
    const variants = {
        fadeIn,
        slideUp,
        slideDown,
        slideLeft,
        slideRight,
        scale
    }

    return (
        <motion.div
            className={className}
            variants={variants[variant]}
            transition={transition}
        >
            {children}
        </motion.div>
    )
}

// Hover animation for cards
interface AnimatedCardProps {
    children: ReactNode
    className?: string
    whileHover?: any
    whileTap?: any
}

export function AnimatedCard({
    children,
    className,
    whileHover = { scale: 1.01, y: -1 },
    whileTap = { scale: 0.99 }
}: AnimatedCardProps) {
    return (
        <motion.div
            className={className}
            whileHover={whileHover}
            whileTap={whileTap}
            transition={transitions.subtle}
        >
            {children}
        </motion.div>
    )
}

// Button animation
interface AnimatedButtonProps {
    children: ReactNode
    className?: string
    disabled?: boolean
    whileHover?: any
    whileTap?: any
}

export function AnimatedButton({
    children,
    className,
    disabled = false,
    whileHover = { scale: 1.02 },
    whileTap = { scale: 0.98 }
}: AnimatedButtonProps) {
    return (
        <motion.button
            className={className}
            disabled={disabled}
            whileHover={disabled ? {} : whileHover}
            whileTap={disabled ? {} : whileTap}
            transition={transitions.subtle}
        >
            {children}
        </motion.button>
    )
}

// Page transition wrapper
interface PageTransitionProps {
    children: ReactNode
    className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div
            className={className}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideUp}
            transition={transitions.smooth}
        >
            {children}
        </motion.div>
    )
}
