import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { SearchForm } from "@/components/search-form"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Your Store</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/collections" className="transition-colors hover:text-primary">
            Collections
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <SearchForm />
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
