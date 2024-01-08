import React from "react";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-transparent">{children}</body>
    </html>
  );
}
