"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react"

export default function DiagnosticsPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/shopify/diagnostics")
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopify Connection Diagnostics</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connection Test</CardTitle>
          <CardDescription>Test your connection to the Shopify Storefront API</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center space-x-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <p>Running diagnostics...</p>
            </div>
          ) : results ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Environment Variables</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <span className="mr-2">SHOPIFY_STORE_DOMAIN:</span>
                    {results.environment.domainExists ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">SHOPIFY_STOREFRONT_ACCESS_TOKEN:</span>
                    {results.environment.tokenExists ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Network Connectivity</h3>
                {results.ping?.success ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">Connection Successful</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Successfully connected to Shopify domain (Status: {results.ping.status}, Time:{" "}
                      {results.ping.duration}ms)
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Failed</AlertTitle>
                    <AlertDescription>{results.ping?.error || "Could not connect to Shopify domain"}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">GraphQL API</h3>
                {results.graphql?.success ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">API Connection Successful</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Successfully connected to Shopify GraphQL API (Status: {results.graphql.status}, Time:{" "}
                      {results.graphql.duration}ms)
                      {results.graphql.data?.data?.shop?.name && (
                        <div className="mt-2">
                          <strong>Shop Name:</strong> {results.graphql.data.data.shop.name}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>API Connection Failed</AlertTitle>
                    <AlertDescription>
                      {results.graphql?.error || "Could not connect to Shopify GraphQL API"}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          ) : null}
        </CardContent>
        <CardFooter>
          <Button onClick={runDiagnostics} disabled={loading} className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            {loading ? "Running..." : "Run Diagnostics"}
          </Button>
        </CardFooter>
      </Card>

      <div className="text-sm text-gray-500">
        <p>If you're experiencing connection issues, please check the following:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Verify that your environment variables are correctly set</li>
          <li>Ensure your Shopify Storefront API access token has the necessary permissions</li>
          <li>Check if there are any network restrictions blocking outbound connections</li>
          <li>Verify that the Shopify API is not experiencing any outages</li>
        </ul>
      </div>
    </div>
  )
}
