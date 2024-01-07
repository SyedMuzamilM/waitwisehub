import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { WaitlistEmail } from "@/emails/waitlist";
import { Resend } from "resend";
import { resendApiKey } from "@/lib/constants";

const resend = new Resend(resendApiKey);

export const POST = async (
  req: NextRequest,
  context: { params: { projectId: string } }
) => {
  const userAgent = req.headers.get("user-agent");
  let ip = req.ip;
  if (!ip) {
    ip = req.headers.get("X-Forwarded-For") ?? "";
  }
  const geo = req.geo;

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
};

const getApiKey = async (req: NextRequest) => {
  const url = new URL(req.url);
  let apiKey = url.searchParams.get("api_key");
  if (apiKey) return apiKey;

  const json = (await req.json()) as { api_key: string };
  apiKey = json.api_key;
  if (apiKey) return apiKey;

  return null;
};

const getUserIdFromToken = async (apiKey: string, supabase: SupabaseClient) => {
  const token = await supabase
    .from("tokens")
    .select("*")
    .eq("hashed_key", apiKey)
    .limit(1)
    .single();

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
