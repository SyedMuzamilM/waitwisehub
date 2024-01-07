export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

export const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM!
export const emailPass = process.env.NEXT_PUBLIC_EMAIL_PASS!
export const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY!

export const url = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://waitwisehub.vercel.app'