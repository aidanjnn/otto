import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, GitCommit, GitPullRequest, MessageSquare, Mail, Calendar, CircleDot } from 'lucide-react'
import type { Receipt } from '@/types'

interface ReceiptsBlockProps {
    receipts: Receipt[]
}

const iconMap = {
    commit: GitCommit,
    pr: GitPullRequest,
    slack: MessageSquare,
    email: Mail,
    event: Calendar,
    issue: CircleDot,
}

export function ReceiptsBlock({ receipts }: ReceiptsBlockProps) {
    if (receipts.length === 0) return null

    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Sources
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {receipts.map((receipt, index) => {
                        const Icon = iconMap[receipt.type] || ExternalLink
                        return (
                            <li key={index}>
                                <a
                                    href={receipt.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                                >
                                    <Icon className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{receipt.title}</span>
                                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50" />
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    )
}
