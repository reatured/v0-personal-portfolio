import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCollectionByHandle } from "@/lib/shopify"
import { formatPrice } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const { handle } = params
  const response = await getCollectionByHandle(handle)

  // Handle API errors
  if (!response || response.error || !response.body) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{response?.error || "Failed to load collection. Please try again later."}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const collection = response.body.data?.collection

  if (!collection) {
    notFound()
  }

  const products = collection.products.edges.map(({ node }: any) => node)

  return (
    <div className="container mx-auto py-10">
      <Link href="/collections" className="inline-flex items-center mb-6 text-sm font-medium hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to collections
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{collection.title}</h1>
        {collection.description && <p className="text-gray-600">{collection.description}</p>}
      </div>

      {products.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No products found in this collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const image = product.images.edges[0]?.node
            const price = product.priceRange.minVariantPrice

            return (
              <Link key={product.id} href={`/products/${product.handle}`} className="group">
                <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 group-hover:shadow-md">
                  <div className="relative aspect-square bg-gray-100">
                    {image ? (
                      <Image
                        src={image.url || "/placeholder.svg?height=400&width=400&query=product"}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                        <span className="text-sm">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                    <p className="font-semibold">{formatPrice(Number.parseFloat(price.amount), price.currencyCode)}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
