import { Icons } from "@/components/icons";
import { url } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FormMetadata } from "@/types";
import React from "react";

const alignment = (key: "inline" | "stack") =>
  key === "inline" ? "flex-row" : "flex-col";
const position = (key: "start" | "center" | "end") =>
  key === "start"
    ? "justify-start"
    : key === "center"
    ? "justify-center"
    : "justify-end";

const getColor = (key: string, color: string) => {
  if (key.includes("border")) {
    return `border-[${color}]`;
  } else if (key.includes("text")) {
    return `text-[${color}]`;
  } else if (key.includes("background")) {
    return `bg-[${color}]`;
  } else if (key.includes("placeholder")) {
    return `placeholder:text-[${color}]`;
  }
};

const EmbedWaitlistFrom = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `${url}/api/projects/${params.id}/apperance`
  );
  const result = await res.json();
  const customForm = result.custom_form as FormMetadata;

  console.log("CustomForm:: ", result);

  if (!customForm) {
    return (
      <div className="flex justify-center items-center">
        <Icons.spinner className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="container py-8">
      <form
        method="GET"
        action={`${url}/api/submission/${params.id}`}
        className={cn(
          "flex gap-4",
          customForm?.alignment && alignment(customForm.alignment),
          customForm?.position && position(customForm.position)
        )}
      >
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder={customForm?.input_placeholder ?? "Email"}
          className={cn(
            "p-2 rounded-xl border-2 border-green-700 text-lg w-full",
            // customForm?.input && Object.entries(customForm.input).map(([key, color]) =>
            //   getColor(key, color)
            // )
          )}
          style={{
            backgroundColor: customForm.input.background_color,
            color: customForm.input.text_color,
            borderColor: customForm.input.border_color
          }}
        />
        <button
          type="submit"
          className={cn(
            "w-full bg-green-700 rounded-xl py-2 text-white font-semibold text-lg",
            // customForm?.button && Object.entries(customForm.button).map(([key, color]) =>
            //   getColor(key, color)
            // )
          )}
          style={{
            backgroundColor: customForm.button.background_color,
            color: customForm.button.text_color,
            borderColor: customForm.button.border_color
          }}
        >
          {customForm?.button_text ?? "Submit"}
        </button>
      </form>
    </section>
  );
};

export default EmbedWaitlistFrom;
