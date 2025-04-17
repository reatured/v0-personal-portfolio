import Image from "next/image"
import Link from "next/link"
import { getCollections } from "@/lib/shopify"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function CollectionsPage() {
  const response = await getCollections()

  // Handle API errors or undefined responses
  if (!response || response.error || !response.body) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {response?.error || "Failed to load collections. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const collections = response.body.data?.collections?.edges?.map(({ node }: any) => node) || []

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Collections</h1>

      {collections.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No collections found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((collection: any) => (
            <Link key={collection.id} href={`/collections/${collection.handle}`} className="group">
              <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 group-hover:shadow-md">
                <div className="relative aspect-[3/2] bg-gray-100">
                  {collection.image ? (
                    <Image
                      src={collection.image.url || "/placeholder.svg?height=300&width=450&query=collection"}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{collection.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
