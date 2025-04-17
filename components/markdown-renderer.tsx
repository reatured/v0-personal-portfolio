"use client"
import { useState } from "react"
import type React from "react"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Image from "next/image"

interface MarkdownRendererProps {
  content: string
}

// Update the ImageGrid2Column component to use a 2-column grid layout on desktop
function ImageGrid2Column({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${className || ""}`}>{children}</div>
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded">{error}</div>
  }

  try {
    return (
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]} // Add rehypeRaw to support HTML in markdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="my-4" {...props} />,
            ul: ({ node, ordered, className, children, ...rest }) => (
              <ul className={`list-disc pl-6 my-4 ${className || ""}`} {...rest}>
                {children}
              </ul>
            ),
            ol: ({ node, ordered, className, children, ...rest }) => (
              <ol className={`list-decimal pl-6 my-4 ${className || ""}`} {...rest}>
                {children}
              </ol>
            ),
            li: ({ node, ordered, ...props }) => {
              // Also filter out ordered from li elements
              const { className, children, ...rest } = props
              return (
                <li className={`mb-1 ${className || ""}`} {...rest}>
                  {children}
                </li>
              )
            },
            a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4" {...props} />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <div className="relative">
                  <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto my-4 text-sm">
                    <code className={className} {...props}>
                      {String(children).replace(/\n$/, "")}
                    </code>
                  </pre>
                  <div className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {match[1]}
                  </div>
                </div>
              ) : (
                <code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
            img({ node, ...props }) {
              // Only use Next.js Image for images that don't have specific styling or parent elements
              const parentIsDiv = node?.parent?.tagName === "div"

              if (parentIsDiv) {
                // For images inside divs (like our grid), use regular img tag to preserve layout
                return <img {...props} className={`rounded-lg ${props.className || "w-full h-auto"}`} />
              }

              // For standalone images, use Next.js Image component without the wrapper div
              return (
                <Image
                  src={props.src || ""}
                  alt={props.alt || ""}
                  width={1200}
                  height={850}
                  className="rounded-lg my-10 w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 1600px"
                />
              )
            },
            // Add proper handling for div elements with specific classes
            div({ node, className, children, ...props }) {
              // Handle special div classes
              if (className?.includes("image-grid-2column")) {
                return <ImageGrid2Column className={className}>{children}</ImageGrid2Column>
              }

              // For other divs, pass through the children directly if they contain images
              const hasDirectImageChild = node?.children?.some(
                (child) =>
                  child.tagName === "img" ||
                  (child.children && child.children.some((grandchild) => grandchild.tagName === "img")),
              )

              if (hasDirectImageChild) {
                return <>{children}</>
              }

              // Otherwise render as a normal div
              return (
                <div className={className} {...props}>
                  {children}
                </div>
              )
            },
            // Add support for iframes (for embedded content)
            iframe({ node, ...props }) {
              return <iframe {...props} />
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    )
  } catch (err) {
    console.error("Error rendering markdown:", err)
    setError("There was an error rendering this content. Please try again later.")
    return <div className="text-red-500 p-4 border border-red-300 rounded">Error rendering content</div>
  }
}
