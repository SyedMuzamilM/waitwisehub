import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string; token_id: string } }
) => {
  try {
    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    // const short_id = context.params.id;
    const token_id = context.params.token_id;

    const {
      data: { session },
      error: userError,
    } = await supabase.auth.getSession();

    if (userError || !session) {
      return NextResponse.json({
        error: {
          message: userError?.message ?? "No User found",
        },
      });
    }

    // Todo: Check if the token is releated to the project and this user...
    const { data, error } = await supabase
      .from("tokens")
      .delete()
      .eq("id", token_id)
      
    if (error) {
      return NextResponse.json({
        error: {
          message: error?.message ?? "Something went wrong",
        },
      });
    }

    return NextResponse.json({ message: "API Key deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
      },
    });
  }
};

export const PATCH = async (
  req: NextRequest,
  context: { params: { id: string; token_id: string } }
) => {
  try {
    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const short_id = context.params.id;
    const token_id = context.params.token_id;

    const {
      data: { session },
      error: userError,
    } = await supabase.auth.getSession();

    if (userError || !session) {
      return NextResponse.json({
        error: {
          message: userError?.message ?? "No User found",
        },
      });
    }

    const { name } = await req.json();

    const { data, error } = await supabase
      .from("tokens")
      .update({ name })
      .eq("id", token_id)
      .eq("site_id", short_id);

    if (error) {
      return NextResponse.json({
        error: {
          message: error?.message ?? "Something went wrong",
        },
      });
    }

    return NextResponse.json({ message: "API Key updated successfully" });
  } catch (err: any) {
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
      },
    });
  }
};
