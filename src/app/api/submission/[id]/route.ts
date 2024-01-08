import { ipGeoApiKey } from "@/lib/constants";
import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    let ip = req.ip;
    if (!ip) {
      ip = req.headers.get("X-Forwarded-For") ?? "";
    }
    let geo: any = req.geo;

    if (!geo && ip) {
      const res = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeoApiKey}&ip=${ip}`
      );
      if (res.ok) {
        const json = await res.json();
        geo.city = json.city;
        geo.country = json.country_name;
        geo.latitude = json.latitude;
        geo.longitude = json.longitude;
        geo.region = json.continent_code;
      }
    }
    const userAgent = req.headers.get("user-agent");

    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    // console.log(req.body)
    // console.log(await req.json())
    // const { email } = await req.json() as { email: string; }
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

    const { data, error } = await supabase
      .from("submissions")
      .insert({
        email,
        ip,
        geo,
        user_agent: userAgent,
        form_id: form.id,
      })
      .select("*");

    if (error) {
      return NextResponse.json({
        error: {
          message: error.message,
        },
      });
    }

    return NextResponse.redirect(`${url.origin}/w/e/${short_id}?message=success`)
  } catch (err: any) {
    console.log({ err });
    return NextResponse.json({
      error: {
        message: err?.message ?? "Something went wrong",
      },
    });
  }
};
