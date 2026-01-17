/**
 * GitHub Sync Route
 * POST /api/integrations/github/sync
 */

import { NextRequest, NextResponse } from 'next/server'
import { syncGitHubRepo } from '@/lib/integrations/github'

export async function POST(req: NextRequest) {
    try {
        const { repo_id } = await req.json()

        if (!repo_id) {
            return NextResponse.json(
                { error: 'Missing repo_id' },
                { status: 400 }
            )
        }

        const eventsSynced = await syncGitHubRepo(repo_id)

        return NextResponse.json({
            events_synced: eventsSynced,
            last_synced_at: new Date().toISOString(),
        })
    } catch (error) {
        console.error('GitHub sync error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
