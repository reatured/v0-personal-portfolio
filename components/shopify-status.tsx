"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function ShopifyStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function checkConnection() {
      try {
        const response = await fetch("/api/shopify/check-connection")
        const data = await response.json()

        if (data.success) {
          setStatus("connected")
        } else {
          setStatus("error")
          setMessage(data.error || "Could not connect to Shopify")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Failed to check Shopify connection")
      }
    }

    checkConnection()
  }, [])

  if (status === "loading") {
    return (
      <Alert className="bg-gray-50 border-gray-200">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse"></div>
          <AlertTitle>Checking Shopify connection...</AlertTitle>
        </div>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="bg-green-50 border-green-200">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-600">Connected to Shopify</AlertTitle>
      <AlertDescription className="text-green-700">Your store is successfully connected</AlertDescription>
    </Alert>
  )
}
