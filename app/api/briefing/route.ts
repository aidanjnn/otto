/**
 * Briefing API Route
 * GET /api/briefing
 */

import { NextRequest, NextResponse } from 'next/server'
import { processQuery } from '@/lib/query/engine'
import type { BriefingResponse } from '@/types'

export async function GET(req: NextRequest) {
    try {
        const workspaceId = req.nextUrl.searchParams.get('workspace_id')

        if (!workspaceId) {
            return NextResponse.json(
                { error: 'Missing workspace_id parameter' },
                { status: 400 }
            )
        }

        // Use daily briefing intent
        const result = await processQuery(
            'What do I need to care about today?',
            workspaceId
        )

        const response: BriefingResponse = {
            date: new Date().toISOString().split('T')[0],
            summary: result.summary,
            sections: [], // TODO: Group by source
            receipts: result.receipts,
            token_stats: result.token_stats,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Briefing API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
