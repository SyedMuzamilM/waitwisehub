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

    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("*")
      .eq("short_id", short_id);

    if (siteError) {
      return NextResponse.json({
        error: {
          message: siteError.message,
        },
      });
    }

    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("site_id", site[0].id);

    if (error) {
      return NextResponse.json({
        error: {
          message: error?.message ?? "Something went wrong",
        },
      });
    }

    return NextResponse.json(data[0]);
  } catch (err: any) {
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
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

    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("*")
      .eq("user_id", session?.user.id)
      .eq("short_id", short_id);

    if (siteError) {
      return NextResponse.json({
        error: {
          message: siteError.message,
        },
      });
    }

    const { data: form } = await supabase
      .from("forms")
      .select("*")
      .eq("site_id", site[0].id)
      .limit(1)
      .single();

    if (form) {
      const { data, error } = await supabase
        .from("forms")
        .update({
          site_id: site[0].id,
          custom_form: {
            ...form.custom_form,
            ...metadata 
          },
        })
        .eq("id", form.id)
        .select("*");

      if (error) {
        return NextResponse.json({
          error: {
            message: error?.message ?? "Something went wrong",
          },
        });
      }

      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from("forms")
      .insert({
        site_id: site[0].id,
        custom_form: metadata,
      })
      .select("*");

    if (error) {
      return NextResponse.json({
        error: {
          message: error?.message ?? "Something went wrong",
        },
      });
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
