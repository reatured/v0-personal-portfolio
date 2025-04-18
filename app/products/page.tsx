import Image from "next/image"
import Link from "next/link"
import { getAllProducts } from "@/lib/shopify"
import { formatPrice } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/lib/mock-data"

export const dynamic = "force-dynamic" // Disable static generation for this page

export default async function ProductsPage() {
  console.log("ProductsPage: Starting to render products page")

  try {
    console.log("ProductsPage: Calling getAllProducts()")
    const response = await getAllProducts()
    console.log(`ProductsPage: getAllProducts returned with status: ${response?.status}`)

    // Use real data if available, otherwise fall back to mock data
    let products = []
    let usingMockData = false

    if (response && !response.error && response.body?.data?.products?.edges) {
      products = response.body.data.products.edges.map(({ node }: any) => node)
      console.log(`ProductsPage: Found ${products.length} real products`)
    } else {
      // Fall back to mock data
      products = mockProducts
      usingMockData = true
      console.log("ProductsPage: Using mock product data as fallback")
    }

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Products</h1>

        {usingMockData && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <InfoIcon className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-600">Using Demo Data</AlertTitle>
            <AlertDescription className="text-yellow-700">
              We're currently displaying demo products because we couldn't connect to your Shopify store.
              <div className="mt-2">
                <Link href="/diagnostics">
                  <Button variant="outline" size="sm" className="text-yellow-700 border-yellow-300 hover:bg-yellow-100">
                    Check Connection Status
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {products.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              const image = product.images?.edges?.[0]?.node || {
                url: "/placeholder.svg?height=400&width=400&query=product",
              }
              const price = product.priceRange?.minVariantPrice

              return (
                <Link key={product.id} href={`/products/${product.handle}`} className="group">
                  <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 group-hover:shadow-md">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={image.url || "/placeholder.svg?height=400&width=400&query=product"}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
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
  } catch (error) {
    console.error("ProductsPage: Unhandled error in page render:", error)

    // Fall back to mock data in case of any error
    const products = mockProducts

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Products</h1>

        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <InfoIcon className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-600">Using Demo Data</AlertTitle>
          <AlertDescription className="text-yellow-700">
            We're currently displaying demo products because we couldn't connect to your Shopify store.
            <div className="mt-2">
              <Link href="/diagnostics">
                <Button variant="outline" size="sm" className="text-yellow-700 border-yellow-300 hover:bg-yellow-100">
                  Check Connection Status
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const image = product.images?.edges?.[0]?.node || {
              url: "/placeholder.svg?height=400&width=400&query=product",
            }
            const price = product.priceRange?.minVariantPrice

            return (
              <Link key={product.id} href={`/products/${product.handle}`} className="group">
                <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 group-hover:shadow-md">
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={image.url || "/placeholder.svg?height=400&width=400&query=product"}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
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
      </div>
    )
  }
}
