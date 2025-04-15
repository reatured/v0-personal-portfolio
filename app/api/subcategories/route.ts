import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const categorySlug = searchParams.get("categorySlug")

  if (!categorySlug) {
    return NextResponse.json({ error: "Category slug is required" }, { status: 400 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    const subcategories = await sql`
      SELECT s.id, s.name, s.slug, s.category_id
      FROM subcategories s
      JOIN categories c ON s.category_id = c.id
      WHERE c.slug = ${categorySlug}
      ORDER BY s.id ASC
    `

    return NextResponse.json(subcategories)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 })
  }
}
