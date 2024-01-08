import React from "react";
import type { Metadata } from 'next'
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Embeded Waitlist'
}

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={cn("bg-transparent")} style={{ background: 'transparent' }}>{children}</body>
    </html>
  );
}
