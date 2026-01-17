/**
 * GitHub Webhook Handler
 * POST /api/integrations/github/webhook
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get('x-hub-signature-256')
        const event = req.headers.get('x-github-event')
        const body = await req.text()

        // Verify webhook signature
        const secret = process.env.GITHUB_WEBHOOK_SECRET
        if (secret && signature) {
            const hmac = crypto.createHmac('sha256', secret)
            hmac.update(body)
            const expected = `sha256=${hmac.digest('hex')}`
            if (signature !== expected) {
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
            }
        }

        const payload = JSON.parse(body)
        const supabase = await createClient()

        // Store as Event
        await supabase.from('events').insert({
            integration_type: 'github',
            event_type: event,
            actor: payload.sender?.login || null,
            title: getEventTitle(event, payload),
            url: getEventUrl(event, payload),
            metadata: payload,
            occurred_at: new Date().toISOString(),
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('GitHub webhook error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

function getEventTitle(event: string | null, payload: Record<string, unknown>): string {
    switch (event) {
        case 'push':
            const commits = payload.commits as Array<{ message: string }> | undefined
            return `Pushed ${commits?.length || 0} commits`
        case 'pull_request':
            const pr = payload.pull_request as { title: string } | undefined
            return pr?.title || 'Pull request'
        case 'issues':
            const issue = payload.issue as { title: string } | undefined
            return issue?.title || 'Issue'
        default:
            return event || 'Unknown event'
    }
}

function getEventUrl(event: string | null, payload: Record<string, unknown>): string | null {
    switch (event) {
        case 'push':
            return (payload.compare as string) || null
        case 'pull_request':
            const pr = payload.pull_request as { html_url: string } | undefined
            return pr?.html_url || null
        case 'issues':
            const issue = payload.issue as { html_url: string } | undefined
            return issue?.html_url || null
        default:
            return null
    }
}
