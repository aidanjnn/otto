'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Room, RoomEvent, Track } from 'livekit-client'

interface MicButtonProps {
    onTranscript?: (text: string) => void
    className?: string
}

export function MicButton({ onTranscript, className }: MicButtonProps) {
    const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
    const [error, setError] = useState<string | null>(null)
    const roomRef = useRef<Room | null>(null)

    const connectToLiveKit = async () => {
        try {
            setConnectionState('connecting')
            setError(null)

            // 1. Get connection token
            const response = await fetch('/api/connection-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                throw new Error('Failed to get connection details')
            }

            const { url, token } = await response.json()

            // 2. Create and connect to LiveKit room
            const room = new Room({
                adaptiveStream: true,
                dynacast: true,
            })

            roomRef.current = room

            // 3. Set up event listeners
            room.on(RoomEvent.Connected, () => {
                console.log('[LiveKit] Connected to room')
                setConnectionState('connected')
            })

            room.on(RoomEvent.Disconnected, () => {
                console.log('[LiveKit] Disconnected from room')
                setConnectionState('disconnected')
            })

            room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
                if (track.kind === Track.Kind.Audio && participant.identity !== room.localParticipant.identity) {
                    // Agent audio track - attach to audio element
                    const audioElement = track.attach()
                    document.body.appendChild(audioElement)
                }
            })

            room.on(RoomEvent.DataReceived, (payload, participant) => {
                // Handle transcripts or other data from agent
                const decoder = new TextDecoder()
                const text = decoder.decode(payload)
                console.log('[LiveKit] Data received:', text)
                if (onTranscript) {
                    onTranscript(text)
                }
            })

            // 4. Connect to room
            await room.connect(url, token)

            // 5. Enable microphone
            await room.localParticipant.setMicrophoneEnabled(true)

            console.log('[LiveKit] Microphone enabled')

        } catch (err: any) {
            console.error('[LiveKit] Connection error:', err)
            setError(err.message)
            setConnectionState('disconnected')
        }
    }

    const disconnectFromLiveKit = async () => {
        if (roomRef.current) {
            await roomRef.current.disconnect()
            roomRef.current = null
        }
        setConnectionState('disconnected')
    }

    const handleClick = async () => {
        if (connectionState === 'connecting') return

        if (connectionState === 'connected') {
            await disconnectFromLiveKit()
        } else {
            await connectToLiveKit()
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (roomRef.current) {
                roomRef.current.disconnect()
            }
        }
    }, [])

    const isConnecting = connectionState === 'connecting'
    const isConnected = connectionState === 'connected'

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                disabled={isConnecting}
                className={cn(
                    'relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-foreground/20',
                    isConnected && 'bg-foreground text-background animate-pulse',
                    isConnecting && 'bg-muted cursor-not-allowed',
                    !isConnected && !isConnecting && 'bg-accent hover:bg-accent/80',
                    className
                )}
                title={isConnected ? 'Disconnect from voice agent' : 'Connect to voice agent'}
            >
                {/* Ripple animation when connected */}
                {isConnected && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-foreground animate-ping opacity-25" />
                        <span className="absolute inset-0 rounded-full bg-foreground animate-pulse opacity-50" />
                    </>
                )}

                {isConnecting ? (
                    <Loader2 className="w-8 h-8 text-muted-foreground animate-spin relative z-10" />
                ) : isConnected ? (
                    <MicOff className="w-8 h-8 text-background relative z-10" />
                ) : (
                    <Mic className="w-8 h-8 text-foreground relative z-10" />
                )}
            </button>

            {/* Error message */}
            {error && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-destructive text-destructive-foreground text-xs rounded-lg text-center">
                    {error}
                </div>
            )}

            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background">
                <div className={cn(
                    'w-full h-full rounded-full transition-colors',
                    isConnected && 'bg-green-500',
                    isConnecting && 'bg-yellow-500 animate-pulse',
                    !isConnected && !isConnecting && 'bg-gray-400'
                )} />
            </div>
        </div>
    )
}
