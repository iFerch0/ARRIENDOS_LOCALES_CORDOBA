import { cn } from '@/lib/utils/cn'
import type { HTMLAttributes, ReactNode } from 'react'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    padding?: CardPadding
    hover?: boolean
    as?: 'div' | 'article' | 'section'
}

const paddingClasses: Record<CardPadding, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
}

export default function Card({
    children,
    padding = 'md',
    hover = false,
    as: Tag = 'div',
    className,
    ...props
}: CardProps) {
    return (
        <Tag
            className={cn(
                'card-base',
                paddingClasses[padding],
                hover && 'cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    )
}
