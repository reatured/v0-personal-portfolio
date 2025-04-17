import Image from "next/image"
import Link from "next/link"
import { searchProducts } from "@/lib/shopify"
import { formatPrice } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""
  const { body } = query ? await searchProducts(query) : { body: { data: { products: { edges: [] } } } }
  const products = body.data?.products.edges.map(({ node }: any) => node) || []

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">{query ? `Search results for "${query}"` : "Search Products"}</h1>

      {query && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No products found for "{query}"</p>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
            Browse all products
          </Link>
        </div>
      )}

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
                      src={image.url || "/placeholder.svg"}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                      No image
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
    </div>
  )
}
