"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EmbedWaitlistFrom = () => {
  const [customForm, setCustomForm] = useState<any>({})
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/projects/${params.id}/apperance`)
      if (res.ok) {
        const result = await res.json();
        console.log(result)
        setCustomForm(result)
      }
    })()
  }, [])

  return (
    <section className={`flex flex-col justify-center ${customForm.custom_form?.position ? `items-${customForm.custom_form.position}` : 'items-center'}`}>
      <h2 className="text-center text-3xl font-bold mb-8">Embed Waitlist From</h2>
      <form className='flex flex-col gap-4'>
        <input type="email" name="email" autoComplete='email' placeholder='Email' className='p-2 rounded-xl border-2 border-green-700 text-lg w-full' />
        <button type="submit" className='w-full bg-green-700 rounded-xl py-2 text-white font-semibold text-lg'>Submit</button>
      </form>
    </section>
  )
}

export default EmbedWaitlistFrom