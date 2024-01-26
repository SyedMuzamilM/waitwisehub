// How to right the status thing here...
// main analytics [{ start: Date, submissions: number }]
// country [{ country: string, submissions: number }]
// city [{ city: string, submissions: number }]
// devices,os,browser [{ device|os|browser: string, submissions: number  }]
// referrals [{ referral: string, submissions: number }]

import { createServerSupabaseClient } from "@/db/supabase-admin";
import { getStats } from "@/lib/stats";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// ....

// /api/projects/blackkalu/stats/timeseries?interval=1h|24h|7d|30d
// .../clicks|timeseries|cities|referrals|top_emails|countries|devices|os|browser   

// ....
// setting
// General (project name, project slug, project logo, delete project)
// Billing (plan usage -> option to upgrade)
// people (Invite others in the project)

// ...
// user setting
// General (user details)
// Api keys (Generate new api keys and edit/delete previous keys)

export const GET = async (req: NextRequest) => {
    try {
        const supabase = createServerSupabaseClient(cookies())
        const stats = await getStats(supabase, { endpoint: 'country', projectId: 'bk', interval: '30d' })
        return NextResponse.json(stats)
    } catch (err) {
        return NextResponse.json({
            error: {
                message: err instanceof Error ? err.message : 'Server error'
            }
        })
    }
}