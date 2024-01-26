import { createServerSupabaseClient } from "@/db/supabase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const url = new URL(req.url);
    const interval = url.searchParams.get("interval");

    const supabase = createServerSupabaseClient(cookies());

    const { count } = await supabase
      .from("submissions")
      .select("*, form:form_id(site_id, site:site_id(short_id))", {
        count: "exact",
      })
      .eq("form.site.short_id", context.params.id)
      .throwOnError();

    return NextResponse.json(count);
  } catch (err) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err.message : "Server error",
      },
    });
  }
};
