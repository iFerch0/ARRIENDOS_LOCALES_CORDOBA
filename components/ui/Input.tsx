'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils/cn'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    hint?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

export default function Input({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    className,
    id,
    ...props
}: InputProps) {
    const autoId = useId()
    const inputId = id ?? autoId

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {leftIcon && (
                    <span
                        className="pointer-events-none absolute left-3 text-neutral-400"
                        aria-hidden="true"
                    >
                        {leftIcon}
                    </span>
                )}

                <input
                    id={inputId}
                    className={cn(
                        'w-full rounded-lg border border-neutral-200 bg-white',
                        'px-3.5 py-2.5 text-sm text-neutral-900',
                        'placeholder:text-neutral-400',
                        'transition-colors duration-150',
                        'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                        'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        leftIcon && 'pl-10',
                        rightIcon && 'pr-10',
                        className
                    )}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    {...props}
                />

                {rightIcon && (
                    <span
                        className="pointer-events-none absolute right-3 text-neutral-400"
                        aria-hidden="true"
                    >
                        {rightIcon}
                    </span>
                )}
            </div>

            {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-neutral-500">
                    {hint}
                </p>
            )}
        </div>
    )
}
