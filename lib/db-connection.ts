import { neon } from "@neondatabase/serverless"

// Check if DATABASE_URL exists and provide better error handling
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set. Database operations will fail.")
}

// Create a SQL client with the connection string from environment variables
// Add a fallback empty string to prevent the function from throwing immediately
const sql = neon(connectionString || "")

// Export a wrapper function that checks for connection before executing queries
export default function executeQuery(query: any, ...params: any[]) {
  if (!connectionString) {
    throw new Error(
      "Database connection string is missing. Please ensure the DATABASE_URL environment variable is set.",
    )
  }

  return sql(query, ...params)
}
