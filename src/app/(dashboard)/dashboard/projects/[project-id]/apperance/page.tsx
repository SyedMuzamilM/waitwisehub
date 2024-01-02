import { AlignCenterVertical, AlignEndVertical, AlignStartVertical, StretchHorizontal, StretchVertical } from 'lucide-react'
import React from 'react'

const Apperance = () => (
    <div>
        <h1 className='text-4xl font-bold'>Apperance</h1>
        <p className='text-zinc-700'>Customise the look of the waitlist fomr</p>
        <div className='grid grid-cols-2'>
        <div className='mt-4 border-t py-4'>
            <h2 className='text-3xl font-medium'>Basic</h2>
            <p className='text-zinc-700'>Customise the basic look and feel</p>

            <div className='mt-4'>
                <h3 className='text-sm font-medium text-zinc-800'>
                    Form Position
                </h3>
                <p className='text-xs text-zinc-700'>Form will algin to parent container</p>
                <div className='mt-4 flex gap-4'>
                    <div className='hover:bg-zinc-200 p-2 rounded cursor-pointer'>
                        <AlignEndVertical />
                    </div>
                    <div className='hover:bg-zinc-200 p-2 rounded cursor-pointer'>
                        <AlignCenterVertical />
                    </div>
                    <div className='hover:bg-zinc-200 p-2 rounded cursor-pointer'>
                        <AlignStartVertical />
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='text-sm font-medium text-zinc-800'>
                    Items Alignment
                </h3>
                <p className='text-xs text-zinc-700'>Form will algin to parent container</p>
                <div className='mt-4 flex gap-4'>
                    <div className='hover:bg-zinc-200 p-2 rounded cursor-pointer'>
                        <StretchHorizontal />
                    </div>
                    <div className='hover:bg-zinc-200 p-2 rounded cursor-pointer'>
                        <StretchVertical />
                    </div>
                </div>
            </div><div className='h-[30rem]'></div>
        </div>
        <div className='relative w-full h-auto mt-8'>
            <div className='sticky bg-zinc-200 overflow-hidden top-32 h-full rounded-xl'>
                <div className='p-4'>
                    <h3 className='text-2xl font-semibold'>Preview</h3>
                </div>
                <div className='h-full'>
                    <iframe src='http://localhost:3000/w/e/bk' width="100%" height="100%" />
                </div>
            </div>
        </div>
        </div>
    </div>
)

export default Apperance