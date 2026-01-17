import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { TokenStats } from '@/types'

interface TokenStatsBlockProps {
    stats: TokenStats
}

export function TokenStatsBlock({ stats }: TokenStatsBlockProps) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Token Usage
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Input</span>
                        <span className="font-mono text-lg">{stats.input_tokens.toLocaleString()}</span>
                    </div>
                    <div className="text-muted-foreground">→</div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Output</span>
                        <span className="font-mono text-lg">{stats.output_tokens.toLocaleString()}</span>
                    </div>
                    {stats.compression_ratio && stats.compression_ratio < 1 && (
                        <>
                            <div className="text-muted-foreground">|</div>
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Compression</span>
                                <span className="font-mono text-lg text-green-400">
                                    {((1 - stats.compression_ratio) * 100).toFixed(0)}% saved
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
