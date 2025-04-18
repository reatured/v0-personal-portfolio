import { neon } from "@neondatabase/serverless"

// Use the DATABASE_URL environment variable that's already available
const connectionString = process.env.DATABASE_URL

// Create a SQL client with the connection string
const sql = neon(connectionString)

// Export the SQL client directly
export default sql
