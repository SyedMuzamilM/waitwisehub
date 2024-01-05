"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  StretchHorizontal,
  StretchVertical,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Icons } from "@/components/icons";
import { BasicFormMetadata } from "@/types";
import { url } from "@/lib/constants";

const defaultMetadata: BasicFormMetadata = {
    position: 'start',
    alignment: 'stack',
    button_text: 'Submit',
    input_placeholder: 'Email'
}

export const BasicForm = () => {
  const [metadata, setMetadata] = useState<BasicFormMetadata>(defaultMetadata)
  const [isLoading, setIsloading] = useState(false)

  const handleChange = (key: keyof BasicFormMetadata, value: any) => {
    setMetadata((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/api/projects/bk/apperance`)

      if (res.ok) {
        const data = await res.json()
        if (data.custom_form) {
          const json = Object.assign(defaultMetadata, data.custom_form)
          setMetadata(json)
        } else {
         alert(JSON.stringify(data)) 
        }
      } else {
        alert(JSON.stringify(await res.json()))
      }

    })()
  }, [])

  const handleSave = async () => {
    setIsloading(true)
    const res = await fetch(`${url}/api/projects/bk/apperance`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
    })

    if (res.ok) {
        alert("Saved!")
        setIsloading(false)
    } else {
        alert("Something went wrong")
        setIsloading(false)
    }
  }

  return (
    <React.Fragment>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-800">Form Position</h3>
        <p className="text-xs text-zinc-700">
          Form will algin to parent container
        </p>
        <div className="mt-4 flex gap-4">
          <div onClick={() => handleChange('position', 'start')} className={cn("hover:bg-zinc-200 p-2 rounded cursor-pointer", metadata.position === "start" && 'bg-zinc-200')}>
            <AlignStartVertical />
          </div>
          <div onClick={() => handleChange('position', 'center')} className={cn("hover:bg-zinc-200 p-2 rounded cursor-pointer", metadata.position === "center" && 'bg-zinc-200')}>
            <AlignCenterVertical />
          </div>
          <div onClick={() => handleChange('position', 'end')} className={cn("hover:bg-zinc-200 p-2 rounded cursor-pointer", metadata.position === "end" && 'bg-zinc-200')}>
            <AlignEndVertical />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-800">Items Alignment</h3>
        <p className="text-xs text-zinc-700">
          Form will algin to parent container
        </p>
        <div className="mt-4 flex gap-4">
          <div onClick={() => handleChange('alignment', 'stack')} className={cn("hover:bg-zinc-200 p-2 rounded cursor-pointer", metadata.alignment === "stack" && 'bg-zinc-200')}>
            <StretchHorizontal />
          </div>
          <div onClick={() => handleChange('alignment', 'inline')} className={cn("hover:bg-zinc-200 p-2 rounded cursor-pointer", metadata.alignment === "inline" && 'bg-zinc-200')}>
            <StretchVertical />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-800">Input Text</h3>
        <p className="text-xs text-zinc-700">
          Change the placeholder text of the email field
        </p>
        <div className="mt-4">
          <Input placeholder="name" defaultValue={metadata.input_placeholder} onChange={(e) => handleChange('input_placeholder', e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-800">Button Text</h3>
        <p className="text-xs text-zinc-700">
          Change the text of the submit button
        </p>
        <div className="mt-4">
          <Input placeholder="name" defaultValue={metadata.button_text} onChange={(e) => handleChange('button_text', e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <Button disabled={isLoading} onClick={handleSave}>
            {isLoading ? <Icons.spinner className="text-white animate-spin" /> : "Save"}
        </Button>
      </div>
    </React.Fragment>
  );
};
