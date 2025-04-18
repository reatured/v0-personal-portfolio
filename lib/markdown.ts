import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project } from "./db"

// Type for frontmatter data
export interface ProjectFrontmatter {
  title: string
  description?: string
  imageUrl?: string
  imageRatio?: "square" | "landscape" | "portrait"
  software?: string
  date?: string
  template?: string
  featured?: boolean
}

// Function to get project content from file system
export async function getProjectMarkdown(categorySlug: string, subcategorySlug: string, projectSlug: string) {
  const filePath = path.join(process.cwd(), "content", categorySlug, subcategorySlug, `${projectSlug}.md`)

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)

      return {
        frontmatter: data as ProjectFrontmatter,
        content,
        exists: true,
      }
    } else {
      // No file exists
      return { exists: false, frontmatter: null, content: null }
    }
  } catch (error) {
    console.error("Error reading markdown file:", error)
    return { exists: false, frontmatter: null, content: null }
  }
}

// Function to write project content to file system
export async function writeProjectMarkdown(
  categorySlug: string,
  subcategorySlug: string,
  projectSlug: string,
  project: Project,
) {
  // Create directory structure if it doesn't exist
  const dirPath = path.join(process.cwd(), "content", categorySlug, subcategorySlug)

  try {
    // Create directories recursively if they don't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    // Create frontmatter data
    const frontmatter: ProjectFrontmatter = {
      title: project.title,
      description: project.description || "",
      imageUrl: project.imageUrl,
      imageRatio: project.imageRatio,
      software: project.software,
    }

    // Extract content without the title (which will be in frontmatter)
    let content = project.content
    if (content.startsWith(`# ${project.title}`)) {
      // Remove the title from content since it's in frontmatter
      content = content.substring(project.title.length + 2).trim()
    }

    // Create markdown with frontmatter
    const markdown = matter.stringify(content, frontmatter)

    // Write to file
    const filePath = path.join(dirPath, `${projectSlug}.md`)
    fs.writeFileSync(filePath, markdown)

    return { success: true, filePath }
  } catch (error) {
    console.error("Error writing markdown file:", error)
    return { success: false, error }
  }
}

// Function to check if a project file exists
export function projectFileExists(categorySlug: string, subcategorySlug: string, projectSlug: string): boolean {
  const filePath = path.join(process.cwd(), "content", categorySlug, subcategorySlug, `${projectSlug}.md`)
  return fs.existsSync(filePath)
}
