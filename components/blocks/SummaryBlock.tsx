import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryBlockProps {
    content: string
    title?: string
}

export function SummaryBlock({ content, title = 'Summary' }: SummaryBlockProps) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground leading-relaxed">{content}</p>
            </CardContent>
        </Card>
    )
}
