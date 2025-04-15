"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Image from "next/image"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="markdown-content"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]} // Add rehypeRaw to support HTML in markdown
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="my-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
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
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
