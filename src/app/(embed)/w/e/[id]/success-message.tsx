"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'

export const SuccessMessage = () => {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  if (message) {
    return (
        <p className="text-mantis-800 mb-4">You have been added to the waitlist</p>
    )
  }
  
  return null
}
