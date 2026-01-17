'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MicButton } from '@/components/voice/MicButton'
import { VoiceStatus } from '@/components/voice/VoiceStatus'
import { SummaryBlock } from '@/components/blocks/SummaryBlock'
import { ReceiptsBlock } from '@/components/blocks/ReceiptsBlock'
import { TokenStatsBlock } from '@/components/blocks/TokenStatsBlock'
import type { QueryResponse } from '@/types'
import { Send, RefreshCw, Settings } from 'lucide-react'

export default function DashboardPage() {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<QueryResponse | null>(null)
    const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'processing'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        setIsLoading(true)
        try {
            const res = await fetch('/api/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: query.trim(),
                    workspace_id: 'demo', // TODO: Get from auth
                }),
            })
            const data = await res.json()
            setResponse(data)
        } catch (error) {
            console.error('Query failed:', error)
        } finally {
            setIsLoading(false)
            setQuery('')
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🎤</span>
                        <h1 className="font-semibold text-xl">Otto</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <VoiceStatus status={voiceStatus} />
                        <Button variant="ghost" size="icon">
                            <Settings className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-screen-xl py-8 space-y-8">
                {/* Daily Briefing */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>📋</span> Today&apos;s Briefing
                        </CardTitle>
                        <CardDescription>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Ask Otto &ldquo;What do I need to care about today?&rdquo; to get your briefing.
                        </p>
                        <Button variant="secondary" className="mt-4" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Generate Briefing
                        </Button>
                    </CardContent>
                </Card>

                {/* Query Bar */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                            <MicButton
                                className="flex-shrink-0"
                                onTranscript={(text) => setQuery(text)}
                            />
                            <div className="flex-1 flex gap-2">
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ask Otto anything... e.g., &quot;What changed since yesterday?&quot;"
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading || !query.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Response */}
                {response && (
                    <div className="space-y-4">
                        <SummaryBlock content={response.summary} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ReceiptsBlock receipts={response.receipts} />
                            <TokenStatsBlock stats={response.token_stats} />
                        </div>
                    </div>
                )}

                {/* Activity Feed Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Activity Feed</CardTitle>
                        <CardDescription>Recent activity from your connected accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-center py-8">
                            Connect your accounts in Settings to see activity here.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
