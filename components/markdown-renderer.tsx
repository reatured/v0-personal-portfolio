"use client"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Image from "next/image"

interface MarkdownRendererProps {
  content: string
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

              // For standalone images, use Next.js Image component with increased size
              return (
                <div className="relative w-full h-auto min-h-[600px] my-10">
                  <Image
                    src={props.src || ""}
                    alt={props.alt || ""}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 1600px"
                  />
                </div>
              )
            },
            // Add proper handling for div elements with specific classes
            div({ node, className, children, ...props }) {
              if (className?.includes("image-grid")) {
                return (
                  <div className="image-grid" {...props}>
                    {children}
                  </div>
                )
              }
              if (className?.includes("grid-4x1")) {
                return (
                  <div className="grid-4x1" {...props}>
                    {children}
                  </div>
                )
              }
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
