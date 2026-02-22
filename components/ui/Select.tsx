'use client'

import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
    value: string
    label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    hint?: string
    options: SelectOption[]
    placeholder?: string
}

export default function Select({
    label,
    error,
    hint,
    options,
    placeholder,
    className,
    id,
    ...props
}: SelectProps) {
    const autoId = useId()
    const selectId = id ?? autoId

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    id={selectId}
                    className={cn(
                        'w-full appearance-none rounded-lg border border-neutral-200 bg-white',
                        'px-3.5 py-2.5 pr-10 text-sm text-neutral-900',
                        'transition-colors duration-150',
                        'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                        'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
                    {...props}
                >
                    {placeholder && (
                        <option value="">{placeholder}</option>
                    )}
                    {options.map(({ value, label: optLabel }) => (
                        <option key={value} value={value}>
                            {optLabel}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                    aria-hidden="true"
                />
            </div>

            {error && (
                <p id={`${selectId}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={`${selectId}-hint`} className="mt-1.5 text-xs text-neutral-500">
                    {hint}
                </p>
            )}
        </div>
    )
}
