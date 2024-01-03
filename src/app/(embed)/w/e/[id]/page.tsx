import { Metadata } from '@/app/(dashboard)/dashboard/projects/[project-id]/apperance/components/basic-form'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'
import React from 'react'

const alignment = (key: 'inline' | 'stack') => key === "inline" ? "flex-row" : "flex-col"
const position = (key: 'start' | 'center' | 'end') => key === "start" ? "justify-start" : key === "center" ? "justify-center" : "justify-end"

const EmbedWaitlistFrom = async ({ params }: { params : { id: string }}) => {
  const res = await fetch(`http://localhost:3000/api/projects/${params.id}/apperance`)
  const result = await res.json();
  const customForm = result.custom_form as Metadata

  console.log("CustomForm:: ", result)

  if (!customForm) {
    return (
      <div className='flex justify-center items-center'>
        <Icons.spinner className='animate-spin' />
      </div>
    )
  }


  return (
    <section className='container py-8'>
      <form method='POST' action={`http://localhost:3000/api/submission/${params.id}`}  className={cn("flex gap-4", customForm?.alignment && alignment(customForm.alignment), customForm?.position && position(customForm.position))}>
        <input type="email" name="email" autoComplete='email' placeholder={customForm?.input_placeholder ?? "Email"} className='p-2 rounded-xl border-2 border-green-700 text-lg w-full' />
        <button type="submit" className='w-full bg-green-700 rounded-xl py-2 text-white font-semibold text-lg'>{customForm?.button_text ?? "Submit" }</button>
      </form>
    </section>
  )
}

export default EmbedWaitlistFrom