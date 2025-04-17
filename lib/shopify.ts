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
  // Check for required environment variables
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!domain || !accessToken) {
    console.error("Shopify API credentials are missing")
    return {
      status: 500,
      error: "Shopify API credentials are missing. Please check your environment variables.",
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

      // Add timeout to the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
        signal: controller.signal,
        next: { revalidate: 60 }, // Cache for 60 seconds
      })

      clearTimeout(timeoutId)

      if (!result.ok) {
        const errorText = await result.text()
        console.error(`Shopify API error: ${result.status} ${errorText}`)
        throw new Error(`API error: ${result.statusText} (${result.status})`)
      }

      const body = await result.json()

      if (body.errors) {
        console.error("Shopify GraphQL errors:", body.errors)
        return {
          status: 200,
          error: body.errors[0]?.message || "GraphQL error",
          body,
        }
      }

      return {
        status: result.status,
        body,
      }
    } catch (error) {
      lastError = error

      // Log detailed error information
      console.error(`Shopify API request failed (attempt ${attempt + 1} of ${retries}):`, error)

      // Don't retry if we've reached the max retries
      if (attempt === retries - 1) {
        break
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 500 // 500ms, 1s, 2s, etc.
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  // All retries failed
  return {
    status: 500,
    error:
      lastError instanceof Error
        ? `Error connecting to Shopify: ${lastError.message}`
        : "Failed to connect to Shopify API after multiple attempts",
    body: { data: null },
  }
}

export async function getAllProducts() {
  console.log("Fetching all products from Shopify...")
  return shopifyFetch({
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
}

export async function getProductByHandle(handle: string) {
  console.log(`Fetching product with handle: ${handle}`)
  return shopifyFetch({
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
}

export async function getCollections() {
  console.log("Fetching collections from Shopify...")
  return shopifyFetch({
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
}

export async function getCollectionByHandle(handle: string) {
  console.log(`Fetching collection with handle: ${handle}`)
  return shopifyFetch({
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
}

export async function searchProducts(query: string) {
  console.log(`Searching products with query: ${query}`)
  return shopifyFetch({
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
}
