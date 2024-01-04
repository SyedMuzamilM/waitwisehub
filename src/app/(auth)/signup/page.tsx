"use client"

import { createBrowserClient } from '@supabase/ssr'
import { supabaseUrl, supabaseAnonKey, url } from "@/lib/constants"

const SignupPage = () => {
    const supabase = createBrowserClient(
        supabaseUrl,
        supabaseAnonKey
    )

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement
        const formData = new FormData(target)

        const email = formData.get("email")?.toString()
        const password = formData.get("password")?.toString()
        const name = formData.get("name")?.toString()

        if (!email || !password) return

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    'admin': email === 'smmhd121@gmail.com' ? true : false,
                    name
                },
                emailRedirectTo: `${url}/api/auth/callback`
            }
        })
    }

    return (
        <main>
            <div className="flex items-center justify-center">
                <div className="max-w-sm w-full">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="text-lg">Name</label>
                            <input type="string" name="name" className="rounded border border-mantis-600 py-2 px-4" placeholder="Name" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input type="email" name="email" className="rounded border border-mantis-600 py-2 px-4" placeholder="Email" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input type="password" name="password" className="rounded border border-mantis-600 py-2 px-4" placeholder="Password" />
                        </div>
                        <button className="py-2 w-full bg-mantis-800 text-white rounded">Signup</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default SignupPage