import { supabaseAnonKey, supabaseUrl } from '@/lib/constants'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CreateSiteForm } from './create-site-form'

const DashboardPage = async () => {
    const cookiesStore = cookies()
    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                get(name: string) {
                    return cookiesStore.get(name)?.value
                }
            }
        }
    )

    const { data, error } = await supabase.auth.getUser();
    return (
        <>
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(data.user)}</pre>
            <div className='flex items-center justify-center'>
                <CreateSiteForm />
            </div>
        </>
    )
}

export default DashboardPage;