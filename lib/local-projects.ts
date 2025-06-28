import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Type definitions for local projects
export interface LocalProject {
  id: string // Using slug as ID
  categorySlug: string
  subcategorySlug: string
  slug: string
  title: string
  description: string
  content: string
  imageUrl?: string
  youtubeId?: string
  software?: string
  imageRatio?: "square" | "landscape" | "portrait"
}

export interface LocalCategory {
  slug: string
  name: string
  description?: string
  imageUrl?: string
  imageRatio?: "square" | "landscape" | "portrait"
}

export interface LocalSubcategory {
  slug: string
  name: string
  description?: string
  imageUrl?: string
  imageRatio?: "square" | "landscape" | "portrait"
}

// Function to get all projects from local files
export async function getAllLocalProjects(): Promise<LocalProject[]> {
  const projects: LocalProject[] = []
  const contentDir = path.join(process.cwd(), "content")

  try {
    // Get all category directories
    const categoryDirs = fs.readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const categorySlug of categoryDirs) {
      const categoryPath = path.join(contentDir, categorySlug)
      
      // Get all subcategory directories
      const subcategoryDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

      for (const subcategorySlug of subcategoryDirs) {
        const subcategoryPath = path.join(categoryPath, subcategorySlug)
        
        // Get all markdown files
        const files = fs.readdirSync(subcategoryPath, { withFileTypes: true })
          .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
          .map(dirent => dirent.name.replace('.md', ''))

        for (const projectSlug of files) {
          const project = await getLocalProject(categorySlug, subcategorySlug, projectSlug)
          if (project) {
            projects.push(project)
          }
        }
      }
    }

    return projects
  } catch (error) {
    console.error("Error reading local projects:", error)
    return []
  }
}

// Function to get a specific project
export async function getLocalProject(categorySlug: string, subcategorySlug: string, projectSlug: string): Promise<LocalProject | null> {
  const filePath = path.join(process.cwd(), "content", categorySlug, subcategorySlug, `${projectSlug}.md`)

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)

      return {
        id: projectSlug,
        categorySlug,
        subcategorySlug,
        slug: projectSlug,
        title: data.title || projectSlug,
        description: data.description || "",
        content,
        imageUrl: data.imageUrl,
        youtubeId: data.youtubeId,
        software: data.software,
        imageRatio: data.imageRatio,
      }
    }
    return null
  } catch (error) {
    console.error("Error reading project file:", error)
    return null
  }
}

// Function to get projects by subcategory
export async function getLocalProjectsBySubcategory(categorySlug: string, subcategorySlug: string): Promise<LocalProject[]> {
  const projects: LocalProject[] = []
  const subcategoryPath = path.join(process.cwd(), "content", categorySlug, subcategorySlug)

  try {
    if (fs.existsSync(subcategoryPath)) {
      const files = fs.readdirSync(subcategoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
        .map(dirent => dirent.name.replace('.md', ''))

      for (const projectSlug of files) {
        const project = await getLocalProject(categorySlug, subcategorySlug, projectSlug)
        if (project) {
          projects.push(project)
        }
      }
    }

    return projects
  } catch (error) {
    console.error("Error reading projects by subcategory:", error)
    return []
  }
}

// Function to get latest projects
export async function getLatestLocalProjects(limit = 3): Promise<LocalProject[]> {
  const allProjects = await getAllLocalProjects()
  return allProjects.slice(0, limit)
}

// Function to get all categories
export async function getAllLocalCategories(): Promise<LocalCategory[]> {
  const categories: LocalCategory[] = []
  const contentDir = path.join(process.cwd(), "content")

  try {
    const categoryDirs = fs.readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const categorySlug of categoryDirs) {
      // Try to find a category info file or use default values
      const categoryInfoPath = path.join(contentDir, categorySlug, "_category.md")
      
      if (fs.existsSync(categoryInfoPath)) {
        const fileContent = fs.readFileSync(categoryInfoPath, "utf8")
        const { data } = matter(fileContent)
        
        categories.push({
          slug: categorySlug,
          name: data.name || categorySlug,
          description: data.description,
          imageUrl: data.imageUrl,
          imageRatio: data.imageRatio,
        })
      } else {
        // Use default values based on slug
        categories.push({
          slug: categorySlug,
          name: categorySlug.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          description: `${categorySlug} projects`,
        })
      }
    }

    return categories
  } catch (error) {
    console.error("Error reading local categories:", error)
    return []
  }
}

// Function to get subcategories for a category
export async function getLocalSubcategoriesByCategory(categorySlug: string): Promise<LocalSubcategory[]> {
  const subcategories: LocalSubcategory[] = []
  const categoryPath = path.join(process.cwd(), "content", categorySlug)

  try {
    if (fs.existsSync(categoryPath)) {
      const subcategoryDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

      for (const subcategorySlug of subcategoryDirs) {
        // Try to find a subcategory info file or use default values
        const subcategoryInfoPath = path.join(categoryPath, subcategorySlug, "_subcategory.md")
        
        if (fs.existsSync(subcategoryInfoPath)) {
          const fileContent = fs.readFileSync(subcategoryInfoPath, "utf8")
          const { data } = matter(fileContent)
          
          subcategories.push({
            slug: subcategorySlug,
            name: data.name || subcategorySlug,
            description: data.description,
            imageUrl: data.imageUrl,
            imageRatio: data.imageRatio,
          })
        } else {
          // Use default values based on slug
          subcategories.push({
            slug: subcategorySlug,
            name: subcategorySlug.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            description: `${subcategorySlug} projects`,
          })
        }
      }
    }

    return subcategories
  } catch (error) {
    console.error("Error reading local subcategories:", error)
    return []
  }
}

// Function to find a project by slug across all categories
export async function findLocalProjectBySlug(projectSlug: string): Promise<LocalProject | null> {
  const allProjects = await getAllLocalProjects()
  return allProjects.find(project => project.slug === projectSlug) || null
} 