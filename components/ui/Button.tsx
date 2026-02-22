import { cn } from '@/lib/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    children: ReactNode
    fullWidth?: boolean
    loading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md',
    secondary: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    ghost: 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
    whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark shadow-sm hover:shadow-md',
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-md',
    md: 'px-5 py-2.5 text-sm gap-2   rounded-lg',
    lg: 'px-7 py-3.5 text-base gap-2 rounded-lg',
}

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-semibold',
                'transition-all duration-200 cursor-pointer select-none',
                'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                variantClasses[variant],
                sizeClasses[size],
                fullWidth && 'w-full',
                className
            )}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span
                    className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                    aria-hidden="true"
                />
            ) : leftIcon}

            <span>{children}</span>

            {!loading && rightIcon}
        </button>
    )
}
