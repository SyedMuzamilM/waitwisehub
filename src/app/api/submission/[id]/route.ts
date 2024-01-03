import { supabaseServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, context: { params: { id: string } }) => {
    try {
        console.log(await req.json())
        console.log(req.body)
        const { email } = await req.json() as { email: string; } 
        const short_id = context.params.id

        const cookieStore = cookies()
        const supabase = supabaseServer(cookieStore);

        const { data, error } = await supabase.from("submission").insert({
            email,
            site_id: short_id
        }).select("*")

        if (error) {
            return NextResponse.json({
                error: {
                    message: error?.message ?? "Something went wrong"
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