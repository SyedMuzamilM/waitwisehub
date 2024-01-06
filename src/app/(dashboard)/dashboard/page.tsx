import { Icons } from '@/components/icons';
import { redirect } from 'next/navigation'

const DashboardPage = async () => {
    redirect('/dashboard/projects')
    return (
        <Icons.spinner className='animate-spin' />
    )
}

export default DashboardPage;