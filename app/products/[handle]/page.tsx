import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductByHandle } from "@/lib/shopify"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = params
  const { body } = await getProductByHandle(handle)
  const product = body.data?.product

  if (!product) {
    notFound()
  }

  const images = product.images.edges.map(({ node }: any) => node)
  const variants = product.variants.edges.map(({ node }: any) => node)
  const price = product.priceRange.minVariantPrice

  return (
    <div className="container mx-auto py-10">
      <Link href="/products" className="inline-flex items-center mb-6 text-sm font-medium hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {images[0] && (
              <Image
                src={images[0].url || "/placeholder.svg"}
                alt={images[0].altText || product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1).map((image: any, i: number) => (
                <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.altText || `${product.title} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 15vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-2xl font-semibold mb-4">
            {formatPrice(Number.parseFloat(price.amount), price.currencyCode)}
          </p>

          <div className="prose prose-sm mb-6" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Variants</h3>
              <div className="space-y-2">
                {variants.map((variant: any) => (
                  <div key={variant.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{variant.title}</p>
                      <p className="text-sm text-gray-500">
                        {variant.selectedOptions.map((opt: any) => `${opt.name}: ${opt.value}`).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(Number.parseFloat(variant.price.amount), variant.price.currencyCode)}
                      </p>
                      <p className="text-xs text-gray-500">{variant.availableForSale ? "In stock" : "Out of stock"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
