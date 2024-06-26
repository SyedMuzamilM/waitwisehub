import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { WaitlistEmail } from "@/emails/waitlist";
import { Resend } from "resend";
import { resendApiKey } from "@/lib/constants";
import { hashToken } from "@/lib/auth";

const resend = new Resend(resendApiKey);

export const runtime = "edge";

export const POST = async (
  req: NextRequest,
  context: { params: { projectId: string } }
) => {
  try {
    const userAgent = req.headers.get("user-agent");
    let ip = req.ip;
    if (!ip) {
      ip = req.headers.get("X-Forwarded-For")?.split(",")[0] ?? "";
    }
    let geo: any = req.geo;

    if (!geo?.city || !geo?.country) {
      if (ip.length) {
        const res = await fetch(`https://ip-api.com/json/${ip}?fields=61439`);
        if (res.ok) {
          const json = await res.json();
          const newgeo = {
            city: json.city,
            country: json.country,
            latitude: json.lat,
            longitude: json.lon,
            region: json.regionName,
            timezone: json.timezone,
          };
          geo = newgeo;
        }
      }
    }

    const apiKey = await getApiKey(req);

    if (!apiKey) {
      return NextResponse.json({
        error: {
          message: "No API Key provided",
        },
      });
    }

    const tokenUserId = await getUserIdFromToken(apiKey, supabase);
    const formId = await getFomIdFromProjectId(
      context.params.projectId,
      tokenUserId,
      supabase
    );

    const { email, additional_data } = (await req.json()) as {
      email: string;
      additional_data: any;
    };

    const { data, error } = await supabase
      .from("submissions")
      .insert({
        email,
        additional_data,
        geo,
        ip,
        user_agent: userAgent,
        form_id: formId,
      })
      .select("*")
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({
        error: {
          message: error.message,
        },
      });
    }

    await resend.emails.send({
      from: "waitwisehub <noreply@blackkalu.com>",
      to: ["smmhd121@gmail.com"],
      subject: `New submission on BK`,
      react: WaitlistEmail({ email, additional_data }),
      text: "",
    });

    // const emailRes = await sendEmail('Hello world')

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        message: error?.message ?? "Something went wrong",
      },
    });
  }
};

export const GET = async (
  req: NextRequest,
  context: { params: { projectId: string } }
) => {
  try {
    const apiKey = await getApiKey(req);
    if (!apiKey) {
      return NextResponse.json({
        error: {
          message: "API Key is missing",
        },
      });
    }

    const tokenUserId = await getUserIdFromToken(apiKey, supabase);
    const formId = await getFomIdFromProjectId(
      context.params.projectId,
      tokenUserId,
      supabase
    );

    const url = new URL(req.url);
    const page = url.searchParams.get("page") ?? "1";
    const perPage = url.searchParams.get("perPage") ?? "10";

    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("form_id", formId)
      .range(
        (parseInt(page) - 1) * parseInt(perPage),
        parseInt(page) * parseInt(perPage) - 1
      );

    if (error) {
      return NextResponse.json({
        error: {
          message: error.message,
        },
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      error: {
        message: error?.message ?? "Something went wrong",
      },
    });
  }
};

// Todo: API Key should be present in headers as x-api-key
const getApiKey = async (req: NextRequest) => {
  const url = new URL(req.url);
  let apiKey = url.searchParams.get("api_key");
  if (apiKey) return hashToken(apiKey, { noSecret: true });

  apiKey = req.headers.get("x-api-key");
  if (apiKey) return hashToken(apiKey, { noSecret: true });

  return null;
};

const getUserIdFromToken = async (apiKey: string, supabase: SupabaseClient) => {
  const token = await supabase
    .from("tokens")
    .select("*")
    .eq("hashed_key", apiKey)
    .limit(1)
    .single();

  console.log({ token, apiKey });

  if (token.error) {
    return NextResponse.json({
      error: {
        message: token.error.message,
      },
    });
  }

  return token.data.user_id;
};

const getFomIdFromProjectId = async (
  projectId: string,
  tokenUserId: string,
  supabase: SupabaseClient
) => {
  const project = await supabase
    .from("sites")
    .select("*")
    .eq("short_id", projectId)
    .eq("user_id", tokenUserId)
    .limit(1)
    .single();

  if (project.error) {
    return NextResponse.json({
      error: {
        message: project.error.message,
      },
    });
  }

  const form = await supabase
    .from("forms")
    .select("*")
    .eq("site_id", project.data.id)
    .limit(1)
    .single();

  if (form.error) {
    return NextResponse.json({
      error: {
        message: form.error.message,
      },
    });
  }

  return form.data.id;
};
