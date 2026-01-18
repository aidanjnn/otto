'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MicButton } from '@/components/voice/MicButton'
import { VoiceStatus } from '@/components/voice/VoiceStatus'
import { VoiceOrbs } from '@/components/voice/VoiceOrbs'
import { Send, RefreshCw, Settings, ChevronLeft, Search, FileText, Calendar, MessageSquare, Github, Mail, CheckCircle2, Clock, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle')
    const [isSpeaking, setIsSpeaking] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setQuery('')
        }, 1000)
    }

    const toggleSpeaking = () => {
        setIsSpeaking(!isSpeaking)
        setVoiceStatus(isSpeaking ? 'idle' : 'speaking')
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
                {/* Left teal gradient waves */}
                <div className="absolute left-0 top-0 w-1/3 h-full opacity-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 via-teal-800/10 to-transparent"></div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="tealGradDash" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#115e59" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#0d4f4f" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>
                        {[...Array(15)].map((_, i) => (
                            <path
                                key={i}
                                d={`M${i * 40} 0 Q${i * 40 + 20} ${500 + Math.sin(i) * 200} ${i * 40} 1000`}
                                stroke="url(#tealGradDash)"
                                strokeWidth="1.5"
                                fill="none"
                                className="animate-wave"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </svg>
                </div>
                
                {/* Right orange gradient waves */}
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-60">
                    <div className="absolute inset-0 bg-gradient-to-l from-orange-600/20 via-orange-700/10 to-transparent"></div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="orangeGradDash" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#c2410c" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        {[...Array(25)].map((_, i) => (
                            <path
                                key={i}
                                d={`M${600 + i * 25} 0 Q${600 + i * 25 + 12} ${500 + Math.cos(i) * 250} ${600 + i * 25} 1000`}
                                stroke="url(#orangeGradDash)"
                                strokeWidth="1"
                                fill="none"
                                className="animate-wave-slow"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            />
                        ))}
                    </svg>
                </div>
            </div>

            {/* Main Layout */}
            <div className="relative z-10 min-h-screen flex">
                {/* Sidebar */}
                <aside className="w-60 bg-[#141414]/80 backdrop-blur-md border-r border-white/5 flex flex-col">
                    {/* Workspace */}
                    <div className="p-3 flex items-center gap-2 border-b border-white/5">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                            O
                        </div>
                        <span className="text-white text-sm font-medium flex-1">Otto Workspace</span>
                        <ChevronLeft className="w-4 h-4 text-[#6b6b6b]" />
                    </div>

                    {/* Search */}
                    <div className="p-3">
                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 text-[#6b6b6b] text-sm hover:bg-white/10">
                            <Search className="w-4 h-4" />
                            <span>Search</span>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-3 space-y-1">
                        <SidebarItem icon={<FileText className="w-4 h-4" />} label="My Briefings" active />
                        <SidebarItem icon={<Calendar className="w-4 h-4" />} label="Calendar" />
                        <SidebarItem icon={<MessageSquare className="w-4 h-4" />} label="Slack Updates" />
                        <SidebarItem icon={<Github className="w-4 h-4" />} label="GitHub Activity" />
                        <SidebarItem icon={<Mail className="w-4 h-4" />} label="Email" />
                    </nav>

                    {/* Settings */}
                    <div className="p-3 border-t border-white/5">
                        <button className="flex items-center gap-2 text-[#8a8a8a] hover:text-white text-sm transition-colors">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-12 border-b border-white/5 bg-[#141414]/60 backdrop-blur-md flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-white text-sm">{currentDate}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <VoiceStatus status={voiceStatus} />
                            <RefreshCw className="w-4 h-4 text-[#6b6b6b] cursor-pointer hover:text-white" />
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto p-6">
                        <div className="max-w-2xl mx-auto">
                            {/* Glassy Content Card */}
                            <div className="backdrop-blur-xl bg-[#1a1a1a]/80 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                                {/* Window Controls */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>

                                {/* Briefing Content */}
                                <div className="p-6 space-y-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <h1 className="text-xl font-semibold text-white">{currentDate}</h1>
                                            </div>
                                            <p className="text-[#9b9b9b] text-sm leading-relaxed">
                                                Good morning! You have <span className="text-white">2 emails</span> from Minimalcompany Gmail that need your review, 
                                                including a pressing matter regarding carrier issues piling up at The Minimal. 
                                                Additionally, there&apos;s a <span className="text-white">direct message</span> waiting for your response on Slack, 
                                                so be sure to check that as well.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Insights */}
                                    <div className="space-y-4">
                                        {/* Email Insight */}
                                        <InsightItem 
                                            icon={<Mail className="w-4 h-4" />}
                                            title="Re: Andre - carrier issues piling up at The Minimal"
                                            subtitle="Follow up on Q4 shipping issues for process improvement"
                                            type="email"
                                        />

                                        {/* Slack DM Insight - Expanded */}
                                        <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded bg-[#4A154B] flex items-center justify-center text-white text-xs">
                                                    #
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-white font-medium">DM from Alex</h3>
                                                    <p className="text-[#6b6b6b] text-sm">Get attention approved by Apple today for shipping.</p>
                                                </div>
                                            </div>
                                            <p className="text-[#9b9b9b] text-sm pl-9">
                                                You need to obtain approval from Apple for the attention so that shipping can proceed. This 
                                                task is time-sensitive and needs to be completed today.
                                            </p>
                                            <div className="flex items-center gap-2 pl-9">
                                                <Clock className="w-4 h-4 text-[#6b6b6b]" />
                                                <span className="text-[#8a8a8a] text-sm">Get attention approved by Apple</span>
                                            </div>
                                            <div className="flex items-center justify-between pl-9 pt-2">
                                                <div className="flex items-center gap-4">
                                                    <button className="text-green-500 text-sm font-medium hover:text-green-400">Done</button>
                                                    <button className="text-[#6b6b6b] text-sm hover:text-white">Ignore</button>
                                                </div>
                                                <button className="flex items-center gap-1 text-[#6b6b6b] text-sm hover:text-white">
                                                    View in Slack <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="pl-9 pt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add a note or reminder..."
                                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-[#4b4b4b] focus:outline-none focus:border-white/20"
                                                />
                                            </div>
                                        </div>

                                        {/* Calendar Insight */}
                                        <InsightItem 
                                            icon={<Calendar className="w-4 h-4" />}
                                            title="TikTok <> The Minimal?"
                                            subtitle="Inquire about current TikTok campaigns for potential partnership"
                                            type="calendar"
                                        />

                                        {/* GitHub Insight */}
                                        <InsightItem 
                                            icon={<Github className="w-4 h-4" />}
                                            title="PR #142: Feature/voice-integration merged"
                                            subtitle="3 new commits pushed to main branch"
                                            type="github"
                                        />
                                    </div>

                                    {/* Query Input */}
                                    <div className="pt-4 border-t border-white/5">
                                        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                                            <MicButton
                                                className="flex-shrink-0 w-10 h-10"
                                                onTranscript={(text) => setQuery(text)}
                                            />
                                            <Input
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Ask Otto anything..."
                                                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-[#4b4b4b] h-10"
                                                disabled={isLoading}
                                            />
                                            <Button 
                                                type="submit" 
                                                disabled={isLoading || !query.trim()}
                                                size="icon"
                                                className="bg-white text-[#191919] hover:bg-[#e0e0e0] h-10 w-10"
                                            >
                                                <Send className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Voice Agent Panel */}
                <aside className="w-72 bg-[#0f0f10]/90 backdrop-blur-md border-l border-white/5 flex flex-col items-center justify-center">
                    <div className="flex-1 flex items-center justify-center">
                        <VoiceOrbs isSpeaking={isSpeaking} />
                    </div>
                    
                    {/* Demo Toggle Button */}
                    <div className="p-6 w-full">
                        <Button
                            onClick={toggleSpeaking}
                            className={`w-full ${isSpeaking 
                                ? 'bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700' 
                                : 'bg-white/10 hover:bg-white/20'
                            } text-white border-0`}
                        >
                            {isSpeaking ? 'Stop Speaking' : 'Start Speaking'}
                        </Button>
                        <p className="text-[#4b4b4b] text-xs text-center mt-2">
                            Demo: Toggle voice animation
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <button className={`
            w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
            ${active 
                ? 'bg-white/10 text-white' 
                : 'text-[#8a8a8a] hover:bg-white/5 hover:text-white'
            }
        `}>
            {icon}
            <span>{label}</span>
        </button>
    )
}

function InsightItem({ icon, title, subtitle, type }: { icon: React.ReactNode; title: string; subtitle: string; type: string }) {
    const bgColors: Record<string, string> = {
        email: 'bg-blue-600',
        calendar: 'bg-purple-600',
        github: 'bg-gray-700',
        slack: 'bg-[#4A154B]'
    }

    return (
        <div className="flex items-start gap-3 py-2 hover:bg-white/5 rounded-lg px-2 -mx-2 cursor-pointer transition-colors">
            <div className={`w-6 h-6 rounded flex items-center justify-center text-white ${bgColors[type] || 'bg-gray-600'}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-medium truncate">{title}</h3>
                <p className="text-[#6b6b6b] text-sm truncate">{subtitle}</p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-[#3b3b3b] flex-shrink-0" />
        </div>
    )
}
