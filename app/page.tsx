import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="container px-4 md:px-6 flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to Your Shopify Store</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">Browse our latest products and collections.</p>

        {/* Remove the ShopifyStatus component from the home page to prevent API errors */}

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/collections">View Collections</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/diagnostics">Connection Status</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
