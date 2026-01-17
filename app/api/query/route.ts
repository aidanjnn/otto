/**
 * Query API Route
 * POST /api/query
 */

import { NextRequest, NextResponse } from 'next/server'
import { processQuery } from '@/lib/query/engine'
import type { QueryRequest, QueryResponse } from '@/types'

export async function POST(req: NextRequest) {
    try {
        const body: QueryRequest = await req.json()

        if (!body.query || !body.workspace_id) {
            return NextResponse.json(
                { error: 'Missing required fields: query and workspace_id' },
                { status: 400 }
            )
        }

        const response: QueryResponse = await processQuery(
            body.query,
            body.workspace_id
        )

        return NextResponse.json(response)
    } catch (error) {
        console.error('Query API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
