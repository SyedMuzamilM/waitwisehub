import { supabaseServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateRandomCode } from "@/lib/rand";

export const GET = async (req: NextRequest) => {
  try {
    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({
        error: {
          message: userError?.message ?? "No User found",
        },
      });
    }

    const { data, error } = await supabase
      .from("sites")
      .select("*")
      .eq("user_id", user.id);

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

export const POST = async (req: NextRequest) => {
  try {
    const { name, url } = (await req.json()) as { name: string; url: string };
    let short_id = generateRandomCode();

    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);
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

    let { count } = await supabase
      .from("sites")
      .select("*", { count: "exact" })
      .eq("short_id", short_id);
    while (count !== null && count > 0) {
      short_id = generateRandomCode();
      let { count: newCount } = await supabase
        .from("sites")
        .select("*", { count: "exact" })
        .eq("short_id", short_id);
      count = newCount;
    }

    const { data, error } = await supabase
      .from("sites")
      .insert({
        name,
        url,
        short_id,
        user_id: session.user.id,
      })
      .select("*")
      .limit(1)
      .single();

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
