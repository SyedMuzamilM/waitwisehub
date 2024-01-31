import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const short_id = context.params.id;

    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const { data } = await supabase
      .from("submissions")
      .select("*, form:form_id(site_id, project:site_id(short_id))")
      .eq("form.project.short_id", short_id)
      .throwOnError()

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err?.message : "Server Error",
      },
    });
  }
};
