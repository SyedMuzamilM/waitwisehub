import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { url } from '@/lib/constants'
import { parseUserAgent } from '@/lib/useragentparser'
import Image from 'next/image'
import React from 'react'

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
        <div className='grid grid-cols-3 gap-6'>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle>User Added</CardTitle>
          </CardHeader>
          <CardContent>
            <svg width="500" height="300">
              {Object.keys(groupedData).map((key: any, index: number) => (
                <rect
                  key={index}
                  x={index * 30}
                  y={300 - groupedData[key] * 10}
                  width="20"
                  height={groupedData[key] * 10}
                  fill="blue"
                />
              ))}
            </svg>
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {data.map((it: any) => (
                <li key={it.id}>
                  <div className="flex items-center space-x-2 p-2 bg-gray-100">
                  <img src={`https://flag.vercel.app/m/${it.geo?.country}.svg`} alt={it.geo?.country} className='h-3 w-5' />
                  <p className='text-sm text-gray-800 underline-offset-4 group-hover:underline'>{it.geo?.country}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage