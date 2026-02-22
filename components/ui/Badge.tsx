import { cn } from '@/lib/utils/cn'
import type { ReactNode } from 'react'

type BadgeVariant = 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'price'

interface BadgeProps {
    children: ReactNode
    variant?: BadgeVariant
    className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100  text-accent-700',
    neutral: 'bg-neutral-100 text-neutral-600',
    success: 'bg-green-100   text-green-700',
    warning: 'bg-amber-100   text-amber-700',
    price: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-sm',
}

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1',
                'rounded-md px-2.5 py-0.5 text-xs font-semibold',
                variantClasses[variant],
                className
            )}
        >
            {children}
        </span>
    )
}
