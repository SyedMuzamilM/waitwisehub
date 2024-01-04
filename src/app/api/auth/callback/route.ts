// import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { supabaseServer } from "@/lib/supabase";

export const GET = async (req: Request) => {
  try {
      const url = new URL(req.url);
      const code = url.searchParams.get('code')

      const cookieStore = cookies()

      const supabase = supabaseServer(cookieStore)
    
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
    
      return NextResponse.redirect("http://localhost:3000/dashboard")
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err })
  }
};
