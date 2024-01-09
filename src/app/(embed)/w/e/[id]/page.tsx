"use client";

import { Icons } from "@/components/icons";
import { url } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FormMetadata } from "@/types";
import { PackageCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SuccessMessage } from "./success-message";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { useParams } from "next/navigation";

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

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/api/projects/${params.id}/apperance`, {
        cache: "no-cache",
      });

      const result = await res.json();
      setCustomForm(result.custom_form);
    })();
  }, []);

  return (
    <>
      {customForm ? (
        <section className="">
          <form
            method="GET"
            action={`${url}/api/submission/${params.id}`}
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
            />
            <Button
              backgroundColor={customForm?.button?.background_color}
              borderColor={customForm?.button?.border_color}
              textColor={customForm?.button?.text_color}
            >
              {customForm?.button_text ?? "Submit"}
            </Button>
            <SuccessMessage />
          </form>
          <p className="flex text-mantis-800 mt-2 gap-1">
            Powered by{" "}
            <span className="flex font-bold">
              <PackageCheck /> waitwisehub
            </span>
          </p>
        </section>
      ) : null}
    </>
  );
};

export default EmbedWaitlistFrom;
