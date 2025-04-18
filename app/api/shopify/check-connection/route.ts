import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if environment variables exist
    const domain = process.env.SHOPIFY_STORE_DOMAIN
    const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

    if (!domain || !accessToken) {
      console.error("Shopify API credentials are missing")
      return NextResponse.json({
        success: false,
        error: "Shopify API credentials are missing. Please check your environment variables.",
      })
    }

    // Simple check - just verify we can reach the domain
    try {
      // Use a simple HEAD request instead of a GraphQL query
      const response = await fetch(`https://${domain}/`, {
        method: "HEAD",
        cache: "no-store",
        // Add a timeout to prevent hanging
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: "Successfully connected to Shopify domain",
        })
      } else {
        return NextResponse.json({
          success: false,
          error: `Failed to connect to Shopify domain: ${response.status} ${response.statusText}`,
        })
      }
    } catch (fetchError) {
      console.error("Error connecting to Shopify:", fetchError)
      return NextResponse.json({
        success: false,
        error: fetchError instanceof Error ? fetchError.message : "Failed to connect to Shopify",
      })
    }
  } catch (error) {
    console.error("Unexpected error in check-connection route:", error)
    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred while checking the Shopify connection",
    })
  }
}
