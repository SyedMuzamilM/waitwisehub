"use client" 

import React, { FC } from "react"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "./codeblock"
import { MarkdownMemoized } from "./markdown-memoized"

interface MessageMarkdownProps {
  content: string
}

export const Markdown: FC<MessageMarkdownProps> = ({ content }) => {
  return (
    <MarkdownMemoized
      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words"
      remarkPlugins={[remarkGfm]}
      components={{
        h2({ children }) {
          return <h2 className="text-2xl font-medium">{children}</h2>
        },  
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        li({ children }) {
          return <li className="list-disc ml-4">{children}</li>
        },
        ul({ children }) {
          return <ul className="list-disc ml-4">{children}</ul>
        },
        a({ node, children, ...props }) {
          return <a className="text-blue-500 hover:underline" {...props}>{children}</a>
        },
        code({ node, className, children, ...props }) {
          const childArray = React.Children.toArray(children)
          const firstChild = childArray[0] as React.ReactElement
          const firstChildAsString = React.isValidElement(firstChild)
            ? (firstChild as React.ReactElement).props.children
            : firstChild

          if (firstChildAsString === "▍") {
            return <span className="mt-1 animate-pulse cursor-default">▍</span>
          }

          if (typeof firstChildAsString === "string") {
            childArray[0] = firstChildAsString.replace("`▍`", "▍")
          }

          const match = /language-(\w+)/.exec(className || "")

          if (
            typeof firstChildAsString === "string" &&
            !firstChildAsString.includes("\n")
          ) {
            return (
              <code className={className} {...props}>
                {childArray}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || "typescript"}
              value={String(childArray).replace(/\n$/, "")}
              {...props}
            />
          )
        }
      }}
    >
      {content}
    </MarkdownMemoized>
  )
}