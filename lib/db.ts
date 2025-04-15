import executeQuery from "./db-connection"

// Type definitions
export type Project = {
  id: number
  subcategoryId: number
  title: string
  slug: string
  content: string
  imageUrl: string
  software?: string
  imageRatio?: "square" | "landscape" | "portrait"
  description: string
}

export type Subcategory = {
  id: number
  categoryId: number
  name: string
  slug: string
  description: string
  imageUrl: string
  imageRatio?: "square" | "landscape" | "portrait"
}

export type Category = {
  id: number
  name: string
  slug: string
  description: string
  imageUrl: string
  imageRatio?: "square" | "landscape" | "portrait"
}

// Database functions
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await executeQuery`
      SELECT 
        id, 
        name, 
        slug, 
        description, 
        image_url as "imageUrl", 
        image_ratio as "imageRatio"
      FROM categories
      ORDER BY id
    `
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getSubcategoriesByCategory(categorySlug: string): Promise<Subcategory[]> {
  try {
    const subcategories = await executeQuery`
      SELECT 
        s.id, 
        s.category_id as "categoryId", 
        s.name, 
        s.slug, 
        s.description, 
        s.image_url as "imageUrl", 
        s.image_ratio as "imageRatio"
      FROM subcategories s
      JOIN categories c ON s.category_id = c.id
      WHERE c.slug = ${categorySlug}
      ORDER BY s.id
    `
    return subcategories
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categorySlug}:`, error)
    return []
  }
}

export async function getProjectsBySubcategory(subcategorySlug: string): Promise<Project[]> {
  try {
    const projects = await executeQuery`
      SELECT 
        p.id, 
        p.subcategory_id as "subcategoryId", 
        p.title, 
        p.slug, 
        p.content, 
        p.image_url as "imageUrl", 
        p.software, 
        p.image_ratio as "imageRatio",
        p.description
      FROM projects p
      JOIN subcategories s ON p.subcategory_id = s.id
      WHERE s.slug = ${subcategorySlug}
      ORDER BY p.id
    `
    return projects
  } catch (error) {
    console.error(`Error fetching projects for subcategory ${subcategorySlug}:`, error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await executeQuery`
      SELECT 
        id, 
        name, 
        slug, 
        description, 
        image_url as "imageUrl", 
        image_ratio as "imageRatio"
      FROM categories
      WHERE slug = ${slug}
      LIMIT 1
    `
    return categories.length > 0 ? categories[0] : null
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error)
    return null
  }
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  try {
    const subcategories = await executeQuery`
      SELECT 
        id, 
        category_id as "categoryId", 
        name, 
        slug, 
        description, 
        image_url as "imageUrl", 
        image_ratio as "imageRatio"
      FROM subcategories
      WHERE slug = ${slug}
      LIMIT 1
    `
    return subcategories.length > 0 ? subcategories[0] : null
  } catch (error) {
    console.error(`Error fetching subcategory ${slug}:`, error)
    return null
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await executeQuery`
      SELECT 
        id, 
        subcategory_id as "subcategoryId", 
        title, 
        slug, 
        content, 
        image_url as "imageUrl", 
        software, 
        image_ratio as "imageRatio",
        description
      FROM projects
      WHERE slug = ${slug}
      LIMIT 1
    `
    return projects.length > 0 ? projects[0] : null
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

export async function getCategoryForSubcategory(subcategoryId: number): Promise<Category | null> {
  try {
    const categories = await executeQuery`
      SELECT 
        c.id, 
        c.name, 
        c.slug, 
        c.description, 
        c.image_url as "imageUrl", 
        c.image_ratio as "imageRatio"
      FROM categories c
      JOIN subcategories s ON c.id = s.category_id
      WHERE s.id = ${subcategoryId}
      LIMIT 1
    `
    return categories.length > 0 ? categories[0] : null
  } catch (error) {
    console.error(`Error fetching category for subcategory ${subcategoryId}:`, error)
    return null
  }
}

export async function getSubcategoryForProject(projectId: number): Promise<Subcategory | null> {
  try {
    const subcategories = await executeQuery`
      SELECT 
        s.id, 
        s.category_id as "categoryId", 
        s.name, 
        s.slug, 
        s.description, 
        s.image_url as "imageUrl", 
        s.image_ratio as "imageRatio"
      FROM subcategories s
      JOIN projects p ON s.id = p.subcategory_id
      WHERE p.id = ${projectId}
      LIMIT 1
    `
    return subcategories.length > 0 ? subcategories[0] : null
  } catch (error) {
    console.error(`Error fetching subcategory for project ${projectId}:`, error)
    return null
  }
}

export async function getBreadcrumbsForProject(projectSlug: string) {
  try {
    const project = await getProjectBySlug(projectSlug)
    if (!project) return null

    const subcategory = await getSubcategoryForProject(project.id)
    if (!subcategory) return null

    const category = await getCategoryForSubcategory(subcategory.id)
    if (!category) return null

    return {
      category,
      subcategory,
      project,
    }
  } catch (error) {
    console.error(`Error fetching breadcrumbs for project ${projectSlug}:`, error)
    return null
  }
}

export async function getLatestProjects(limit = 3): Promise<Project[]> {
  try {
    const projects = await executeQuery`
      SELECT 
        id, 
        subcategory_id as "subcategoryId", 
        title, 
        slug, 
        content, 
        image_url as "imageUrl", 
        software, 
        image_ratio as "imageRatio",
        description
      FROM projects
      ORDER BY id DESC
      LIMIT ${limit}
    `
    return projects
  } catch (error) {
    console.error(`Error fetching latest projects:`, error)
    return []
  }
}

export async function getTopProjectsBySubcategory(subcategoryId: number, limit = 3): Promise<Project[]> {
  try {
    const projects = await executeQuery`
      SELECT 
        id, 
        subcategory_id as "subcategoryId", 
        title, 
        slug, 
        content, 
        image_url as "imageUrl", 
        software, 
        image_ratio as "imageRatio",
        description
      FROM projects
      WHERE subcategory_id = ${subcategoryId}
      ORDER BY id
      LIMIT ${limit}
    `
    return projects
  } catch (error) {
    console.error(`Error fetching top projects for subcategory ${subcategoryId}:`, error)
    return []
  }
}

export async function getRelatedProjects(
  currentProjectId: number,
  subcategoryId: number,
  limit = 3,
): Promise<Project[]> {
  try {
    const projects = await executeQuery`
      SELECT 
        id, 
        subcategory_id as "subcategoryId", 
        title, 
        slug, 
        content, 
        image_url as "imageUrl", 
        software, 
        image_ratio as "imageRatio",
        description
      FROM projects
      WHERE 
        subcategory_id = ${subcategoryId} AND
        id != ${currentProjectId}
      ORDER BY id
      LIMIT ${limit}
    `
    return projects
  } catch (error) {
    console.error(`Error fetching related projects:`, error)
    return []
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await executeQuery`
      SELECT 
        id, 
        subcategory_id as "subcategoryId", 
        title, 
        slug, 
        content, 
        image_url as "imageUrl", 
        software, 
        image_ratio as "imageRatio",
        description
      FROM projects
      ORDER BY id DESC
    `
    return projects
  } catch (error) {
    console.error(`Error fetching all projects:`, error)
    return []
  }
}
