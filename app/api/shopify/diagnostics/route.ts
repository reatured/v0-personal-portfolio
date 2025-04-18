import { NextResponse } from "next/server"

export async function GET() {
  console.log("=== SHOPIFY DIAGNOSTICS START ===")

  // Check environment variables
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  console.log(`SHOPIFY_STORE_DOMAIN exists: ${!!domain}`)
  console.log(`SHOPIFY_STORE_DOMAIN value: ${domain ? domain.substring(0, 5) + "..." : "undefined"}`)
  console.log(`SHOPIFY_STOREFRONT_ACCESS_TOKEN exists: ${!!accessToken}`)
  console.log(`SHOPIFY_STOREFRONT_ACCESS_TOKEN length: ${accessToken ? accessToken.length : 0}`)

  // Test network connectivity to Shopify
  try {
    console.log("Testing network connectivity to Shopify...")
    const startTime = Date.now()

    // Just test if we can reach the domain
    const pingResult = await fetch(`https://${domain}/`, {
      method: "HEAD",
      cache: "no-store",
    })

    const endTime = Date.now()
    console.log(`Ping completed in ${endTime - startTime}ms`)
    console.log(`Ping status: ${pingResult.status}`)

    // Now try a simple GraphQL query
    console.log("Testing GraphQL API connectivity...")
    const graphqlStartTime = Date.now()

    try {
      const result = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken || "",
        },
        body: JSON.stringify({
          query: `
            query {
              shop {
                name
              }
            }
          `,
        }),
        cache: "no-store",
      })

      const graphqlEndTime = Date.now()
      console.log(`GraphQL request completed in ${graphqlEndTime - graphqlStartTime}ms`)
      console.log(`GraphQL status: ${result.status}`)

      if (result.ok) {
        const data = await result.json()
        console.log("GraphQL response:", data)

        return NextResponse.json({
          success: true,
          ping: {
            success: true,
            duration: endTime - startTime,
            status: pingResult.status,
          },
          graphql: {
            success: true,
            duration: graphqlEndTime - graphqlStartTime,
            status: result.status,
            data,
          },
          environment: {
            domainExists: !!domain,
            tokenExists: !!accessToken,
          },
        })
      } else {
        const errorText = await result.text()
        console.error(`GraphQL error: ${result.status} ${errorText}`)

        return NextResponse.json({
          success: false,
          ping: {
            success: true,
            duration: endTime - startTime,
            status: pingResult.status,
          },
          graphql: {
            success: false,
            duration: graphqlEndTime - graphqlStartTime,
            status: result.status,
            error: errorText,
          },
          environment: {
            domainExists: !!domain,
            tokenExists: !!accessToken,
          },
        })
      }
    } catch (graphqlError) {
      console.error("GraphQL request failed:", graphqlError)

      return NextResponse.json({
        success: false,
        ping: {
          success: true,
          duration: endTime - startTime,
          status: pingResult.status,
        },
        graphql: {
          success: false,
          error: graphqlError instanceof Error ? graphqlError.message : "Unknown error",
        },
        environment: {
          domainExists: !!domain,
          tokenExists: !!accessToken,
        },
      })
    }
  } catch (pingError) {
    console.error("Ping request failed:", pingError)

    return NextResponse.json({
      success: false,
      ping: {
        success: false,
        error: pingError instanceof Error ? pingError.message : "Unknown error",
      },
      environment: {
        domainExists: !!domain,
        tokenExists: !!accessToken,
      },
    })
  }
}
