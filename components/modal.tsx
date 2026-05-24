'use client'

import { ReactNode } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children
}: ModalProps) {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[99999]">

            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative z-[100000] bg-white text-black p-6 rounded-xl w-full max-w-lg">

                <div className="flex justify-between items-center mb-4">

                    <h1 className="text-xl font-bold">
                        {title}
                    </h1>

                    <button
                        onClick={onClose}
                        className="text-xl"
                    >
                        ×
                    </button>

                </div>

                {children}

            </div>

        </div>
    )
}