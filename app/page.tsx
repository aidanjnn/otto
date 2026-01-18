'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
    const router = useRouter()

    const handleAuth = () => {
        router.push('/onboarding')
    }

    const handleDashboard = () => {
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
                {/* Left teal gradient waves */}
                <div className="absolute left-0 top-0 w-1/2 h-full opacity-60">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-teal-800/20 to-transparent"></div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#115e59" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0d4f4f" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        {[...Array(20)].map((_, i) => (
                            <path
                                key={i}
                                d={`M${i * 50} 0 Q${i * 50 + 25} ${500 + Math.sin(i) * 200} ${i * 50} 1000`}
                                stroke="url(#tealGrad)"
                                strokeWidth="2"
                                fill="none"
                                className="animate-wave"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </svg>
                </div>
                
                {/* Right orange gradient waves */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-70">
                    <div className="absolute inset-0 bg-gradient-to-l from-orange-600/30 via-orange-700/20 to-transparent"></div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#c2410c" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                        {[...Array(30)].map((_, i) => (
                            <path
                                key={i}
                                d={`M${800 + i * 30} 0 Q${800 + i * 30 + 15} ${500 + Math.cos(i) * 300} ${800 + i * 30} 1000`}
                                stroke="url(#orangeGrad)"
                                strokeWidth="1.5"
                                fill="none"
                                className="animate-wave-slow"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Glassy overlay */}
                <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md p-8">
                    {/* Logo */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-2">Otto</h1>
                        <p className="text-[#9b9b9b] text-lg">Your AI workflow assistant</p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6 backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-12 bg-[#2b2b2b]/80 border-[#3d3d3d] text-white placeholder:text-[#6b6b6b] focus:border-[#5c5c5c] focus:ring-0"
                            />
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                className="h-12 bg-[#2b2b2b]/80 border-[#3d3d3d] text-white placeholder:text-[#6b6b6b] focus:border-[#5c5c5c] focus:ring-0"
                            />
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleAuth}
                                className="w-full h-11 bg-white text-[#191919] hover:bg-[#e0e0e0] font-medium"
                            >
                                Log in
                            </Button>
                            <Button
                                onClick={handleAuth}
                                variant="outline"
                                className="w-full h-11 bg-transparent border-[#3d3d3d] text-white hover:bg-[#2b2b2b] hover:text-white font-medium"
                            >
                                Sign up
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#3d3d3d]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-[#6b6b6b]">or</span>
                            </div>
                        </div>

                        {/* Skip to Dashboard Button */}
                        <Button
                            onClick={handleDashboard}
                            variant="outline"
                            className="w-full h-11 bg-gradient-to-r from-teal-600/20 to-orange-600/20 border-[#3d3d3d] text-white hover:from-teal-600/30 hover:to-orange-600/30 hover:text-white font-medium"
                        >
                            Skip to Dashboard →
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-[#6b6b6b] text-sm mt-8">
                        By continuing, you agree to Otto&apos;s Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}
