"use client";

import React from "react";
import { useParams } from "next/navigation";
import { url } from "@/lib/constants";

export const FormFrame = () => {
  const params = useParams() as { "project-id": string };
  return (
    <iframe
      src={`${url}/w/e/${params["project-id"]}`}
      width="100%"
      height="100%"
    />
  );
};
