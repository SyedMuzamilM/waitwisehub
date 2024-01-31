import { FormMetadata } from '@/types'
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
      .from("forms")
      .select("*, site_id(*)")
      .eq("site_id.short_id", short_id)
      .limit(1)
      .single()
      .throwOnError()

    console.log(data)

    return NextResponse.json(data[0]);
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err?.message : "Something went wrong",
      },
    });
  }
};

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const metadata = (await req.json()) as FormMetadata;
    const short_id = context.params.id;

    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const {
      data: { session}
    } = await supabase.auth.getSession();

    const { data: form } = await supabase
      .from("forms")
      .select("*, project:site_id(short_id, id)")
      .eq("project.short_id", short_id)
      .eq("project.user_id", session?.user.id)
      .single()
      .throwOnError()

    if (form) {
      const { data } = await supabase
        .from("forms")
        .update({
          site_id: form.project.id,
          custom_form: {
            ...form.custom_form,
            ...metadata 
          },
        })
        .eq("id", form.id)
        .select("*")
        .throwOnError()

      return NextResponse.json(data);
    }

    const { data } = await supabase
      .from("forms")
      .insert({
        site_id: form.project.id,
        custom_form: metadata,
      })
      .select("*")
      .throwOnError()

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err?.message : "Something went wrong",
      },
    });
  }
};
