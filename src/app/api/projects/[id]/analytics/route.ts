import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const projectId = context.params.id;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString()

  const cookieStore = cookies()
  const supabase = supabaseServer(cookieStore)

  const { data: siteId } = await supabase
    .from('sites')
    .select('id')
    .eq('short_id', projectId)
    .single()

  const { data: formId } = await supabase
    .from('forms')
    .select('id')
    .eq('site_id', siteId?.id)
    .maybeSingle()

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("form_id", formId?.id)
    .gte("created_at", thirtyDaysAgoStr)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({
      error: {
        message: error.message ?? "Something went wrong"
      }
    });
  }

  return NextResponse.json(data);
};
