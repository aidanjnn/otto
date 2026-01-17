'use client'

import { cn } from '@/lib/utils'

interface VoiceStatusProps {
    status: 'idle' | 'connecting' | 'connected' | 'listening' | 'processing' | 'speaking' | 'error'
    className?: string
}

const statusConfig = {
    idle: { label: 'Ready', color: 'bg-gray-400' },
    connecting: { label: 'Connecting...', color: 'bg-yellow-400 animate-pulse' },
    connected: { label: 'Connected', color: 'bg-green-400' },
    listening: { label: 'Listening...', color: 'bg-blue-400 animate-pulse' },
    processing: { label: 'Processing...', color: 'bg-yellow-400 animate-pulse' },
    speaking: { label: 'Otto is speaking', color: 'bg-purple-400 animate-pulse' },
    error: { label: 'Error', color: 'bg-red-400' },
}

export function VoiceStatus({ status, className }: VoiceStatusProps) {
    const config = statusConfig[status]

    return (
        <div className={cn('flex items-center gap-2 text-sm', className)}>
            <span className={cn('w-2 h-2 rounded-full', config.color)} />
            <span className="text-muted-foreground">{config.label}</span>
        </div>
    )
}
