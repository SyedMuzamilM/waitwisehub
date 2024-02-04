import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { url } from '@/lib/constants'
import { parseUserAgent } from '@/lib/useragentparser'
import Image from 'next/image'
import React from 'react'
import BarChart from './components/bar-chart'
import Locations from './components/locations'
import Devices from './components/devices'
import Submissions from './components/submissions'

const getAnalytics = async (projectId: string) => {
  const res = await fetch(`${url}/api/projects/${projectId}/analytics`)
  return await res.json()
}

const OverviewPage = async ({ params }: { params: { 'project-id': string }}) => {
  const data = await getAnalytics(params['project-id'])
  if (!data || data.error) {
    return (
      <div>
        Nothing to show yet
        <br />
        {data?.error?.message}
      </div>
    )
  }

  const groupedData: any = {}

  data?.map((it: any) => {
    const date = it?.created_at?.split('T')[0]
    if (date in groupedData) {
      groupedData[date] += 1
    } else {
      groupedData[date] = 1
    }
  })
  

  return (
    <div>
      <h1 className="text-4xl font-bold">Analytics</h1>
      <p className="text-zinc-700">Check how your waitlist form is doing</p>
      <div className='my-4 py-4 border-t'>
        <Submissions />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
          <Locations />
          <Devices />
        </div>
      </div>
    </div>
  )
}

export default OverviewPage