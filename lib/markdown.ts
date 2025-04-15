import fs from "fs"
import path from "path"

export async function getProjectMarkdown(categorySlug: string, subcategorySlug: string, projectSlug: string) {
  const filePath = path.join(process.cwd(), "content", categorySlug, subcategorySlug, `${projectSlug}.md`)

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      return fileContent
    } else {
      // If no markdown file exists, return null and we'll use the default content
      return null
    }
  } catch (error) {
    console.error("Error reading markdown file:", error)
    return null
  }
}
