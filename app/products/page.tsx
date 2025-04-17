"use client"

import Image from "next/image"
import Link from "next/link"
import { getAllProducts } from "@/lib/shopify"
import { formatPrice } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic" // Disable static generation for this page

export default async function ProductsPage() {
  const response = await getAllProducts()

  // Handle API errors
  if (!response || response.error || !response.body) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading products</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>{response?.error || "Failed to load products from Shopify. Please try again later."}</p>
            <p className="text-sm">This could be due to network connectivity issues or incorrect API credentials.</p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Fallback UI with placeholder products */}
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-gray-200">
              <div className="relative aspect-square bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const products = response.body.data?.products?.edges?.map(({ node }: any) => node) || []

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {products.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No products found in your Shopify store.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const image = product.images?.edges[0]?.node
            const price = product.priceRange?.minVariantPrice

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
                    <p className="font-semibold">
                      {price ? formatPrice(Number.parseFloat(price.amount), price.currencyCode) : "Price unavailable"}
                    </p>
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
