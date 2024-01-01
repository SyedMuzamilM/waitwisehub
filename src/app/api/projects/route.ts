import { supabaseServer } from "@/lib/supabase";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (req: NextApiRequest) => {
    try {
        const cookieStore = cookies()
        const supabase = supabaseServer(cookieStore);
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({
                error: {
                    message: userError?.message ?? "No User found"
                }
            })
        }

        const { data, error } = await supabase.from("sites").select("*").eq('user_id', user.id)

        if (error) {
            return NextResponse.json({
                error: {
                    message: error?.message ?? "Something went wrong"
                }
            })
        }

        return NextResponse.json(data)

    } catch (err: any) {
        return NextResponse.json({
            error: {
                message: err?.message ?? 'Something went wrong'
            }
        })
    }
}

export const POST = async (req: NextApiRequest) => {
    return NextResponse.json(req.body)
    try {
        // const {} = req.body()

        const cookieStore = cookies()
        const supabase = supabaseServer(cookieStore);
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({
                error: {
                    message: userError?.message ?? "No User found"
                }
            })
        }

        const { data, error } = await supabase.from("sites").select("*").eq('user_id', user.id)

        if (error) {
            return NextResponse.json({
                error: {
                    message: error?.message ?? "Something went wrong"
                }
            })
        }

        return NextResponse.json(data)

    } catch (err: any) {
        return NextResponse.json({
            error: {
                message: err?.message ?? 'Something went wrong'
            }
        })
    }
}