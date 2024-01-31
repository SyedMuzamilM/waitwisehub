import { supabaseServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateRandomCode } from "@/lib/rand";
import { url } from "@/lib/constants";

export const GET = async (req: NextRequest) => {
  try {
    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      NextResponse.redirect(`${url}/signin`);
    }

    const { data } = await supabase
      .from("sites")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false })
      .throwOnError();

    // get the sumbissions for each project
    const result: any[] = [];
    if (data?.length) {
      await Promise.all([
        ...data.map(async (project) => {
          const { data: submissions } = await supabase
            .from("submissions")
            .select("created_at, form:form_id(site_id)")
            .eq("form.site_id", project.id)
            .throwOnError();

          const submissionsArray = submissions?.filter((submission: any) => submission.form !== null && submission.form.site_id === project.id) || [];

          const oneHourAgo = new Date();
          oneHourAgo.setHours(oneHourAgo.getHours() - 1);

          const oneHoursSubmissions =
            submissionsArray.filter(
              (submission: any) =>
                new Date(submission.created_at) > oneHourAgo
            ).length || 0;
          const totalSubmissions = submissionsArray.length;

          result.push({
            ...project,
            totalSubmissions,
            oneHoursSubmissions,
          });
        }),
      ]);
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err?.message : "Something went wrong",
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
  } catch (err) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err?.message : "Something went wrong",
      },
    });
  }
};
