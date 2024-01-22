import { hashToken } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase";
import { customAlphabet } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const generateToken = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  24
);

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const short_id = context.params.id;

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

    const { data: site, error: site_error } = await supabase
      .from("sites")
      .select("*")
      .limit(1)
      .eq("short_id", short_id);

    if (site_error) {
      return NextResponse.json({
        error: {
          message: site_error.message ?? "Site not found",
        },
      });
    }

    const { data, error } = await supabase
      .from("tokens")
      .select(
        "partial_key, created_at, updated_at, id, expires, name, last_used"
      )
      .eq("user_id", session.user.id)
      .eq("site_id", site[0].id);

    if (error) {
      return NextResponse.json({
        error: {
          message: error.message ?? "Something went wrong",
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

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { name } = (await req.json()) as { name: string };
    const short_id = context.params.id;

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

    const { data: site, error: siteError } = await supabase
      .from("sites")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("short_id", short_id);

    if (siteError) {
      return NextResponse.json({
        error: {
          message: siteError.message,
        },
      });
    }

    const token = `wwh_${generateToken()}`;
    const hashedKey = hashToken(token, {
      noSecret: true,
    });
    // take first 3 and last 4 characters of the key
    const partialKey = `${token.slice(0, 3)}...${token.slice(-4)}`;

    const { data, error } = await supabase
      .from("tokens")
      .insert({
        site_id: site[0].id,
        user_id: session.user.id,
        partial_key: partialKey,
        hashed_key: hashedKey,
        name,
      })
      .select("name, partial_key, created_at")
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({
        error: {
          message: error?.message ?? "Something went wrong",
        },
      });
    }

    return NextResponse.json({ ...data, token });
  } catch (err: any) {
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
      },
    });
  }
};
