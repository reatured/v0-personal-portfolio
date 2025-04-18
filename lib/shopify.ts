/**
 * Utility function to fetch data from Shopify Storefront API with retry logic
 */
export async function shopifyFetch(
  {
    query,
    variables,
  }: {
    query: string
    variables?: any
  },
  retries = 3,
) {
  console.log("=== SHOPIFY FETCH START ===")

  // Check for required environment variables
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  console.log(`SHOPIFY_STORE_DOMAIN exists: ${!!domain}`)
  if (!domain) {
    console.error("SHOPIFY_STORE_DOMAIN is missing")
    return {
      status: 500,
      error: "Shopify store domain is missing. Please check your environment variables.",
      body: { data: null },
    }
  }

  console.log(`SHOPIFY_STOREFRONT_ACCESS_TOKEN exists: ${!!accessToken}`)
  if (!accessToken) {
    console.error("SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing")
    return {
      status: 500,
      error: "Shopify access token is missing. Please check your environment variables.",
      body: { data: null },
    }
  }

  let lastError

  // Implement retry logic
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Log the attempt if it's a retry
      if (attempt > 0) {
        console.log(`Retrying Shopify API request (attempt ${attempt + 1} of ${retries})...`)
      }

      const endpoint = `https://${domain}/api/2023-10/graphql.json`
      console.log(`Endpoint: ${endpoint}`)

      // Add timeout to the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        console.log("Request timed out after 10 seconds")
      }, 10000) // 10 second timeout

      console.log("Preparing to fetch from Shopify...")

      try {
        console.log("Sending fetch request...")
        const result = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": accessToken,
          },
          body: JSON.stringify({ query, variables }),
          cache: "no-store",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        console.log(`Response status: ${result.status}`)

        if (!result.ok) {
          const errorText = await result.text()
          console.error(`Shopify API error: ${result.status} ${errorText}`)
          throw new Error(`API error: ${result.statusText} (${result.status})`)
        }

        console.log("Parsing JSON response...")
        const body = await result.json()
        console.log("JSON parsed successfully")

        if (body.errors) {
          console.error("Shopify GraphQL errors:", body.errors)
          return {
            status: 200,
            error: body.errors[0]?.message || "GraphQL error",
            body,
          }
        }

        console.log("=== SHOPIFY FETCH SUCCESS ===")
        return {
          status: result.status,
          body,
        }
      } catch (fetchError) {
        clearTimeout(timeoutId)
        throw fetchError // Re-throw to be caught by the outer try/catch
      }
    } catch (error) {
      lastError = error

      // Log detailed error information
      console.error(`Shopify API request failed (attempt ${attempt + 1} of ${retries}):`)
      if (error instanceof Error) {
        console.error(`Error name: ${error.name}`)
        console.error(`Error message: ${error.message}`)

        // Check for specific error types
        if (error.name === "AbortError") {
          console.error("Request was aborted (likely due to timeout)")
        } else if (error.message.includes("fetch")) {
          console.error("Network error - could not reach the Shopify API endpoint")
        }
      } else {
        console.error(`Unknown error type: ${typeof error}`)
      }

      // Don't retry if we've reached the max retries
      if (attempt === retries - 1) {
        console.log("Max retries reached, giving up.")
        break
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 500 // 500ms, 1s, 2s, etc.
      console.log(`Waiting ${delay}ms before retry...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  // All retries failed
  console.log("=== SHOPIFY FETCH FAILED AFTER ALL RETRIES ===")

  // Provide more specific error messages based on the error
  let errorMessage = "Failed to connect to Shopify API after multiple attempts"

  if (lastError instanceof Error) {
    if (lastError.name === "AbortError") {
      errorMessage = "Connection to Shopify API timed out. Please check your network connection."
    } else if (lastError.message.includes("fetch")) {
      errorMessage =
        "Network error connecting to Shopify. Please check your internet connection and Shopify store domain."
    } else {
      errorMessage = `Error connecting to Shopify: ${lastError.message}`
    }
  }

  return {
    status: 500,
    error: errorMessage,
    body: { data: null },
  }
}

export async function getAllProducts() {
  console.log("getAllProducts: Starting to fetch all products from Shopify...")
  const result = await shopifyFetch({
    query: `
      query GetProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `,
  })
  console.log(`getAllProducts: Fetch completed with status ${result.status}`)
  console.log(`getAllProducts: Error present: ${!!result.error}`)
  console.log(`getAllProducts: Body exists: ${!!result.body}`)
  return result
}

export async function getProductByHandle(handle: string) {
  console.log(`getProductByHandle: Fetching product with handle: ${handle}`)
  const result = await shopifyFetch({
    query: `
      query GetProductByHandle($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    `,
    variables: {
      handle: handle,
    },
  })
  console.log(`getProductByHandle: Fetch completed with status ${result.status}`)
  return result
}

export async function getCollections() {
  console.log("getCollections: Starting to fetch collections from Shopify...")
  const result = await shopifyFetch({
    query: `
      query GetCollections {
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
            }
          }
        }
      }
    `,
  })
  console.log(`getCollections: Fetch completed with status ${result.status}`)
  return result
}

export async function getCollectionByHandle(handle: string) {
  console.log(`getCollectionByHandle: Fetching collection with handle: ${handle}`)
  const result = await shopifyFetch({
    query: `
      query GetCollectionByHandle($handle: String!) {
        collection(handle: $handle) {
          id
          title
          handle
          description
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                description
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      handle: handle,
    },
  })
  console.log(`getCollectionByHandle: Fetch completed with status ${result.status}`)
  return result
}

export async function searchProducts(query: string) {
  console.log(`searchProducts: Searching products with query: ${query}`)
  const result = await shopifyFetch({
    query: `
      query SearchProducts($query: String!) {
        products(first: 20, query: $query) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      query: query,
    },
  })
  console.log(`searchProducts: Fetch completed with status ${result.status}`)
  return result
}
