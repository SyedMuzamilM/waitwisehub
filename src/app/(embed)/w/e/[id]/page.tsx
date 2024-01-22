"use client";

import { url } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FormMetadata } from "@/types";
import { PackageCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { useParams, useSearchParams } from "next/navigation";
import { Icons } from "@/components/icons";

const alignment = (key: "inline" | "stack") =>
  key === "inline" ? "flex-row" : "flex-col";
const position = (key: "start" | "center" | "end") =>
  key === "start"
    ? "justify-start"
    : key === "center"
    ? "justify-center"
    : "justify-end";

const EmbedWaitlistFrom = () => {
  const params = useParams() as { id: string };
  const [customForm, setCustomForm] = useState<FormMetadata>();
  const [actionUrl, setActionUrl] = useState(`${url}/api/submission/${params.id}`)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const s = useSearchParams()

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/api/projects/${params.id}/apperance`, {
        cache: "no-cache",
      });

      const result = await res.json();
      setCustomForm(result.custom_form);
    })();

    const ref = s.get('ref')
    if (ref) {
      const url = actionUrl + '?ref=' + ref

      setActionUrl(url)
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const res = await fetch(actionUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...Object.fromEntries(new FormData(e.currentTarget).entries())
      })
    })

    if (res.ok && res.status === 201) {
      setIsSubmitting(false)
      setSubmitted(true)
      setMessage("Thanks for joining the waitlist")
    } else {
      const json = await res.json()
      setIsSubmitting(false)
      setMessage(json?.error ? json?.error?.message : 'Something went wrong')
    }

  }

  return (
    <>
      {!submitted ? (
        <section className="">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "flex gap-4",
              customForm?.alignment && alignment(customForm.alignment),
              customForm?.position && position(customForm.position)
            )}
          >
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={customForm?.input_placeholder ?? "Email"}
              backgroundColor={customForm?.input?.background_color}
              borderColor={customForm?.input?.border_color}
              textColor={customForm?.input?.text_color}
              placeholderColor={customForm?.input?.placeholder_color}
              disabled={isSubmitting}
            />
            <Button
              backgroundColor={customForm?.button?.background_color}
              borderColor={customForm?.button?.border_color}
              textColor={customForm?.button?.text_color}
              disabled={isSubmitting}
            >
              {isSubmitting && <Icons.spinner className="mr-2 animate-spin" color="currentColor" /> }
              {customForm?.button_text ?? "Submit"}
            </Button>
            {(!submitted && message) && (
              <p>{message}</p>
            )}
          </form>
          <p className="flex text-mantis-800 mt-2 gap-1">
            Powered by{" "}
            <span className="flex font-bold">
              <PackageCheck /> waitwisehub
            </span>
          </p>
        </section>
      ) : <p style={{ color: customForm?.input?.border_color ?? 'black' }}>{message}</p>}
    </>
  );
};

export default EmbedWaitlistFrom;
