"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { url } from "@/lib/constants";

export const FormFrame = () => {
  const ref = useRef<HTMLIFrameElement>(null)
  const params = useParams() as { "project-id": string };

  const frameURL = `${url}/w/e/${params["project-id"]}`

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.src = frameURL
      }
    }, 50000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <iframe
      ref={ref}
      id="preview-frame"
      src={frameURL}
      width="100%"
      height="100%"
    />
  );
};
