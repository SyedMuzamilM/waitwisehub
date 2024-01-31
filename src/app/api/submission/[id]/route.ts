import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ipAddress, geolocation } from "@vercel/edge";

export const runtime = "edge";

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const { email } = (await req.json()) as any;

  try {
    let ip = ipAddress(req);
    let geo = geolocation(req);

    if (!geo?.city || !geo?.country) {
      if (ip) {
        const res = await fetch(`https://ip-api.com/json/${ip}?fields=61439`);
        if (res.ok) {
          const json = await res.json();
          const newgeo = {
            city: json.city,
            country: json.country,
            latitude: json.lat,
            longitude: json.lon,
            region: json.regionName,
          };
          geo = newgeo;
        }
      }
    }
    const userAgent = req.headers.get("user-agent");

    const url = new URL(req.url);

    const short_id = context.params.id;

    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: form } = await supabase
      .from("forms")
      .select("*, project:site_id(short_id, id)")
      .eq("project.short_id", short_id)
      .single()
      .throwOnError();

    const { count } = await supabase
      .from("submissions")
      .select("email", { count: "exact" })
      .eq("email", email)
      .eq("form_id", form.id)
      .single();

    if (count) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const submissionData: any = {
      email,
      ip,
      geo,
      user_agent: userAgent,
      form_id: form.id,
    };

    const ref = url.searchParams.get("ref");
    if (ref) {
      submissionData.referred_by = ref;
    }

    await supabase
      .from("submissions")
      .insert(submissionData)
      .select("*")
      .throwOnError();

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({
      error: {
        message: err instanceof Error ? err?.message : "Something went wrong",
      },
    });
  }
};
