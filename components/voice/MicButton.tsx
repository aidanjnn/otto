'use client'

import { useState } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MicButtonProps {
    onTranscript?: (text: string) => void
    className?: string
}

export function MicButton({ onTranscript, className }: MicButtonProps) {
    const [isListening, setIsListening] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleClick = async () => {
        if (isProcessing) return

        if (isListening) {
            setIsListening(false)
            setIsProcessing(true)
            // TODO: Stop recording and process
            setTimeout(() => setIsProcessing(false), 1000)
        } else {
            setIsListening(true)
            // TODO: Start LiveKit recording
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={isProcessing}
            className={cn(
                'relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                'focus:outline-none focus:ring-4 focus:ring-blue-500/50',
                isListening && 'bg-red-500 hover:bg-red-600 animate-pulse',
                isProcessing && 'bg-yellow-500 cursor-not-allowed',
                !isListening && !isProcessing && 'bg-blue-500 hover:bg-blue-600',
                className
            )}
        >
            {/* Ripple animation when listening */}
            {isListening && (
                <>
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse" />
                </>
            )}

            {isProcessing ? (
                <Loader2 className="w-8 h-8 text-white animate-spin relative z-10" />
            ) : isListening ? (
                <MicOff className="w-8 h-8 text-white relative z-10" />
            ) : (
                <Mic className="w-8 h-8 text-white relative z-10" />
            )}
        </button>
    )
}
