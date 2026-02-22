'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type ModalSize = 'sm' | 'md' | 'lg' | 'full'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    size?: ModalSize
}

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    full: 'max-w-full mx-4',
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (isOpen) {
            if (!dialog.open) dialog.showModal()
            document.body.style.overflow = 'hidden'
        } else {
            dialog.close()
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // El evento 'cancel' se dispara al presionar Escape (nativo de <dialog>)
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        const handleCancel = (e: Event) => {
            e.preventDefault()
            onClose()
        }
        dialog.addEventListener('cancel', handleCancel)
        return () => dialog.removeEventListener('cancel', handleCancel)
    }, [onClose])

    return (
        <dialog
            ref={dialogRef}
            className={cn(
                'w-full rounded-2xl p-0 shadow-modal',
                'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
                sizeClasses[size]
            )}
        >
            {title && (
                <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
                    <h2 className="font-display text-lg font-semibold text-neutral-900">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                        aria-label="Cerrar"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            )}

            <div className={cn('p-6', !title && 'relative')}>
                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                        aria-label="Cerrar"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                )}
                {children}
            </div>
        </dialog>
    )
}
