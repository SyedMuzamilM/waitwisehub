"use client"

import React, { useEffect, useState } from "react";
import { ColorStyle } from "../color-style";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LooksMetadata } from "@/types";
import { url } from "@/lib/constants";

const defaultLooksMetadata: LooksMetadata = {
    input: {
        background_color: '#ffffff',
        border_color: '#15803d',
        placeholder_color: '#eeeeee',
        text_color: '#000000'
    },
    button: {
        border_color: '#15803d',
        background_color: '#15803d',
        text_color: '#ffffff'
    }
}

export const LooksForm = () => {
  const [metadata, setMetadata] = useState<LooksMetadata>(defaultLooksMetadata)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (key: string, color: string) => {
    const [parent, child] = key.split('.')
    
    const data: any = { ...metadata }
    data[parent][child] = color

    setMetadata(data)
  }

  useEffect(() => {
    (async () => {
        const res = await fetch(`${url}/api/projects/bk/apperance`)

        const json = await res.json()
        if (json?.custom_form) {
            const data = Object.assign(defaultLooksMetadata, json.custom_form)
            setMetadata(data)
        } else {
            alert(JSON.stringify(json))
        }
    })()
  }, [])

  const handleSave = async () => {
    setIsLoading(true);
    const res = await fetch(`${url}/api/projects/bk/apperance`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
    })

    if (res.ok) {
        alert("Saved")
        setIsLoading(false);
    } else {
        alert("Error check console/network tab")
        setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <div className="mt-4 p-2 border rounded-lg">
        <h3 className="text-xl font-medium">Input</h3>
        <ColorStyle title="Input Border Color" description="" defaultColor={metadata.input.border_color} onChange={(color) => handleChange('input.border_color', color)}/>
        <ColorStyle title="Input Background Color" description="" defaultColor={metadata.input.background_color} onChange={(color) => handleChange('input.background_color', color)}/>
        <ColorStyle title="Input Text Color" description="" defaultColor={metadata.input.text_color} onChange={(color) => handleChange('input.text_color', color)}/>
        <ColorStyle title="Input Placeholder Color" description="" defaultColor={metadata.input.placeholder_color} onChange={(color) => handleChange('input.placeholder_color', color)}/>
      </div>
      <div className="mt-4 p-2 border rounded-lg">
        <h3 className="text-xl font-medium">Button</h3>
        <ColorStyle title="Button Color" description="" defaultColor={metadata.button.background_color} onChange={(color) => handleChange('button.background_color', color)}/>
        <ColorStyle title="Button Border Color" description="" defaultColor={metadata.button.border_color} onChange={(color) => handleChange('button.border_color', color)}/>
        <ColorStyle title="Button Text Color" description="" defaultColor={metadata.button.text_color} onChange={(color) => handleChange('button.text_color', color)}/>
      </div>
      <div className="mt-4">
        <Button disabled={isLoading} onClick={handleSave}>
            {isLoading ? <Icons.spinner className="text-white animate-spin" /> : "Save"}
        </Button>
      </div>
    </React.Fragment>
  );
};
