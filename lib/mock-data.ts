export const mockProducts = [
  {
    id: "mock-product-1",
    title: "Sample T-Shirt",
    handle: "sample-t-shirt",
    description: "A comfortable cotton t-shirt with a modern design.",
    images: {
      edges: [
        {
          node: {
            url: "/classic-cotton-tee.png",
            altText: "Sample T-Shirt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "29.99",
        currencyCode: "USD",
      },
    },
  },
  {
    id: "mock-product-2",
    title: "Classic Jeans",
    handle: "classic-jeans",
    description: "Durable denim jeans with a classic fit.",
    images: {
      edges: [
        {
          node: {
            url: "/denim-collection.png",
            altText: "Classic Jeans",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "59.99",
        currencyCode: "USD",
      },
    },
  },
  {
    id: "mock-product-3",
    title: "Casual Sneakers",
    handle: "casual-sneakers",
    description: "Comfortable sneakers for everyday wear.",
    images: {
      edges: [
        {
          node: {
            url: "/diverse-sneaker-collection.png",
            altText: "Casual Sneakers",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "79.99",
        currencyCode: "USD",
      },
    },
  },
  {
    id: "mock-product-4",
    title: "Hooded Sweatshirt",
    handle: "hooded-sweatshirt",
    description: "A warm and cozy hooded sweatshirt for cooler days.",
    images: {
      edges: [
        {
          node: {
            url: "/cozy-knit-hoodie.png",
            altText: "Hooded Sweatshirt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
  },
]

export const mockCollections = [
  {
    id: "mock-collection-1",
    title: "Summer Collection",
    handle: "summer-collection",
    description: "Light and breathable clothing for hot summer days.",
    image: {
      url: "/vibrant-summer-street.png",
      altText: "Summer Collection",
    },
  },
  {
    id: "mock-collection-2",
    title: "Winter Essentials",
    handle: "winter-essentials",
    description: "Stay warm and stylish with our winter collection.",
    image: {
      url: "/placeholder.svg?height=300&width=450&query=winter+fashion",
      altText: "Winter Essentials",
    },
  },
  {
    id: "mock-collection-3",
    title: "Activewear",
    handle: "activewear",
    description: "Performance clothing for your active lifestyle.",
    image: {
      url: "/placeholder.svg?height=300&width=450&query=activewear",
      altText: "Activewear",
    },
  },
]

export function getMockProductByHandle(handle: string) {
  return mockProducts.find((product) => product.handle === handle) || mockProducts[0]
}

export function getMockCollectionByHandle(handle: string) {
  return {
    ...(mockCollections.find((collection) => collection.handle === handle) || mockCollections[0]),
    products: {
      edges: mockProducts.slice(0, 3).map((product) => ({ node: product })),
    },
  }
}
