import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'

import { Color, SketchPicker } from 'react-color'

export const ColorPicker: React.FC<{
    children: React.ReactNode;
    onChange: (color: string) => void;
    color?: Color
}> = ({ children, onChange, color }) => {
  return (
    <Popover>
        <PopoverTrigger className='w-full'>
            {children}
        </PopoverTrigger>
        <PopoverContent className='p-0 bg-transparent w-auto'>
            <SketchPicker color={color} onChange={(color) => {
                onChange(color.hex)
            }}  />
        </PopoverContent>
    </Popover>
  )
}