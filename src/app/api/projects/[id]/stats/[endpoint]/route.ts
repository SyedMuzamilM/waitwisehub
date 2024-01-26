import { createServerSupabaseClient } from "@/db/supabase-admin";
import { getStats } from "@/lib/stats";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string; endpoint: string } }
) => {
  try {
    const url = new URL(req.url);
    const interval = url.searchParams.get("interval");

    if (!context?.params?.id || !context?.params?.endpoint) {
      return NextResponse.json(
        { error: { message: "Missing parameters" } },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient(cookies());
    const stats = await getStats(supabase, {
      endpoint: context.params.endpoint,
      projectId: context.params.id,
      interval,
    });
    return NextResponse.json(stats);
  } catch (err) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err.message : "Server error",
      },
    });
  }
};
