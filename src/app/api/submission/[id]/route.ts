import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
    try {
        const url = new URL(req.url)
        const email = url.searchParams.get('email')
        // console.log(req.body)
        // console.log(await req.json())
        // const { email } = await req.json() as { email: string; } 
        const short_id = context.params.id

        const cookieStore = cookies()
        const supabase = supabaseServer(cookieStore);

        const { data: site } = await supabase.from("sites").select("*").eq("short_id", short_id).limit(1).single()
        const { data: form } = await supabase.from("forms").select("*").eq("site_id", site.id).limit(1).single()

        const { data, error } = await supabase.from("submissions").insert({
            email,
            form_id: form.id
        }).select("*")

        if (error) {
            return NextResponse.json({
                error: {
                    message: error.message
                }
            })
        }

        return NextResponse.json(data)

    } catch (err: any) {
        console.log({ err })
        return NextResponse.json({
            error: {
                message: err?.message ?? 'Something went wrong'
            }
        })
    }
}