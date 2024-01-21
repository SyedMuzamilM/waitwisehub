import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ipAddress, geolocation, } from '@vercel/edge'

export const runtime = "edge";

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const formData = await req.formData();

  try {
    let ip = ipAddress(req)
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
            region: json.regionName
          };
          geo = newgeo;
        }
      }
    }
    const userAgent = req.headers.get("user-agent");

    const url = new URL(req.url);
    const email = formData.get("email");

    const short_id = context.params.id;

    const cookieStore = cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: site } = await supabase
      .from("sites")
      .select("*")
      .eq("short_id", short_id)
      .limit(1)
      .single();
    const { data: form } = await supabase
      .from("forms")
      .select("*")
      .eq("site_id", site.id)
      .limit(1)
      .single();

    const { count } = await supabase
      .from("submissions")
      .select("*")
      .eq("email", email)
      .eq("form_id", form.id)
      .single();
    if (count && count > 0) {
      return NextResponse.redirect(
        `${url.origin}/w/e/${short_id}?message=success`
      );
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

    const { data, error } = await supabase
      .from("submissions")
      .insert(submissionData)
      .select("*");

    if (error) {
      return NextResponse.json({
        error: {
          message: error.message,
        },
      });
    }

    return NextResponse.redirect(
      `${url.origin}/w/e/${short_id}?message=success`
    );
  } catch (err: any) {
    console.log({ err });
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
      },
    });
  }
};
