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

    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("*")
      .eq("short_id", short_id)
      .limit(1)
      .single();

    if (siteError) {
      return NextResponse.json({
        error: {
          message: siteError.message,
        },
      });
    }

    const { data: form, error: formError } = await supabase
      .from("forms")
      .select("*")
      .eq("site_id", site.id)
      .limit(1)
      .single();

    if (formError) {
      return NextResponse.json({
        error: {
          message: formError?.message ?? "Something went wrong",
        },
      });
    }

    const { data , error } = await supabase.from("submissions").select("*").eq("form_id", form.id);

    if (error) {
        return NextResponse.json({
            error: {
                message: error.message ?? "Something went wrong"
            }
        })
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
      },
    });
  }
};