import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
      const url = new URL(req.url);
      const code = url.searchParams.get('code')
    
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
    
      return NextResponse.redirect("http://localhost:3000/dashboard")
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err })
  }
};
