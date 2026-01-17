'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Github, Calendar, Mail, MessageSquare, FileText, CircleDot } from 'lucide-react'
import type { IntegrationType } from '@/types'

interface Integration {
    type: IntegrationType
    name: string
    description: string
    icon: React.ReactNode
    connected: boolean
}

export default function OnboardingPage() {
    const router = useRouter()
    const [integrations, setIntegrations] = useState<Integration[]>([
        {
            type: 'github',
            name: 'GitHub',
            description: 'Commits, PRs, CI status',
            icon: <Github className="w-8 h-8" />,
            connected: false,
        },
        {
            type: 'slack',
            name: 'Slack',
            description: 'Mentions and threads',
            icon: <MessageSquare className="w-8 h-8" />,
            connected: false,
        },
        {
            type: 'gmail',
            name: 'Gmail',
            description: 'Important emails',
            icon: <Mail className="w-8 h-8" />,
            connected: false,
        },
        {
            type: 'notion',
            name: 'Notion',
            description: 'Pages and databases',
            icon: <FileText className="w-8 h-8" />,
            connected: false,
        },
        {
            type: 'calendar',
            name: 'Google Calendar',
            description: "Today's events",
            icon: <Calendar className="w-8 h-8" />,
            connected: false,
        },
        {
            type: 'linear',
            name: 'Linear',
            description: 'Issues and projects',
            icon: <CircleDot className="w-8 h-8" />,
            connected: false,
        },
    ])

    const handleConnect = async (type: IntegrationType) => {
        // TODO: Implement OAuth flow
        setIntegrations(prev =>
            prev.map(i => (i.type === type ? { ...i, connected: true } : i))
        )
    }

    const connectedCount = integrations.filter(i => i.connected).length

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
            <div className="max-w-3xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="text-6xl">🎤</div>
                    <h1 className="text-4xl font-bold">Welcome to Otto</h1>
                    <p className="text-xl text-muted-foreground">
                        Connect your accounts to get started with voice-first briefings
                    </p>
                </div>

                {/* Integration Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {integrations.map((integration) => (
                        <Card
                            key={integration.type}
                            className={`cursor-pointer transition-all hover:border-primary ${integration.connected ? 'border-green-500 bg-green-500/5' : ''
                                }`}
                            onClick={() => !integration.connected && handleConnect(integration.type)}
                        >
                            <CardContent className="pt-6 text-center space-y-3">
                                <div className={`mx-auto ${integration.connected ? 'text-green-500' : 'text-muted-foreground'}`}>
                                    {integration.connected ? (
                                        <div className="relative">
                                            {integration.icon}
                                            <Check className="w-4 h-4 absolute -top-1 -right-1 text-green-500" />
                                        </div>
                                    ) : (
                                        integration.icon
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{integration.name}</h3>
                                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                                </div>
                                {integration.connected ? (
                                    <span className="text-sm text-green-500">Connected</span>
                                ) : (
                                    <Button variant="outline" size="sm" className="w-full">
                                        Connect
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Continue Button */}
                <div className="flex justify-center">
                    <Button
                        size="lg"
                        onClick={() => router.push('/')}
                        className="min-w-[200px]"
                    >
                        {connectedCount > 0 ? 'Continue to Dashboard' : 'Skip for Now'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    You can always connect more accounts later in Settings
                </p>
            </div>
        </div>
    )
}
