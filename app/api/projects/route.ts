import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const subcategoryId = searchParams.get("subcategoryId")

  if (!subcategoryId) {
    return NextResponse.json({ error: "Subcategory ID is required" }, { status: 400 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    const projects = await sql`
      SELECT id, title, slug, subcategory_id
      FROM projects
      WHERE subcategory_id = ${Number.parseInt(subcategoryId)}
      ORDER BY id ASC
    `

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
