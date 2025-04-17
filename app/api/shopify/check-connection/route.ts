import { shopifyFetch } from "@/lib/shopify"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple query to check if we can connect to Shopify
    const response = await shopifyFetch(
      {
        query: `
        query {
          shop {
            name
          }
        }
      `,
      },
      1,
    ) // Only try once for this check

    if (response.error || !response.body?.data?.shop) {
      return NextResponse.json({
        success: false,
        error: response.error || "Could not connect to Shopify API",
      })
    }

    return NextResponse.json({
      success: true,
      shop: response.body.data.shop.name,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    })
  }
}
