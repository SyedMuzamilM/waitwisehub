// import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { supabaseServer } from "@/lib/supabase";

export const POST = async (req: NextRequest) => {
  try {
      const { email, password } = await req.json() as { email: string; password: string };
      if (!email || !password) {
        return NextResponse.json({
            error: {
                message: 'Missing email or password'
            }
        }, {
            status: 400
        })
      }

      const cookieStore = cookies()

      const supabase = supabaseServer(cookieStore)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return NextResponse.json({
            error: {
                message: error.message
            }
        })
      }
    
      return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err })
  }
};