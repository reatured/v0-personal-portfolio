import sql from "./db-connection"

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
  description: string
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
  const categories = await sql<Category[]>`
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
}

export async function getSubcategoriesByCategory(categorySlug: string): Promise<Subcategory[]> {
  const subcategories = await sql<Subcategory[]>`
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
}

export async function getProjectsBySubcategory(subcategorySlug: string): Promise<Project[]> {
  const projects = await sql<Project[]>`
    SELECT 
      p.id, 
      p.subcategory_id as "subcategoryId", 
      p.title, 
      p.slug, 
      p.content, 
      p.image_url as "imageUrl", 
      p.software, 
      p.image_ratio as "imageRatio"
    FROM projects p
    JOIN subcategories s ON p.subcategory_id = s.id
    WHERE s.slug = ${subcategorySlug}
    ORDER BY p.id
  `
  return projects
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await sql<Category[]>`
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
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  const subcategories = await sql<Subcategory[]>`
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
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await sql<Project[]>`
    SELECT 
      id, 
      subcategory_id as "subcategoryId", 
      title, 
      slug, 
      content, 
      image_url as "imageUrl", 
      software, 
      image_ratio as "imageRatio"
    FROM projects
    WHERE slug = ${slug}
    LIMIT 1
  `
  return projects.length > 0 ? projects[0] : null
}

export async function getCategoryForSubcategory(subcategoryId: number): Promise<Category | null> {
  const categories = await sql<Category[]>`
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
}

export async function getSubcategoryForProject(projectId: number): Promise<Subcategory | null> {
  const subcategories = await sql<Subcategory[]>`
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
}

export async function getBreadcrumbsForProject(projectSlug: string) {
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
}

// Update the getLatestProjects function to fetch from all subcategories, not just subcategory_id 10
export async function getLatestProjects(limit = 3): Promise<Project[]> {
  const projects = await sql<Project[]>`
    SELECT 
      id, 
      subcategory_id as "subcategoryId", 
      title, 
      slug, 
      content, 
      image_url as "imageUrl", 
      software, 
      image_ratio as "imageRatio"
    FROM projects
    ORDER BY id DESC
    LIMIT ${limit}
  `
  return projects
}

// Add this new function after the existing functions

export async function getTopProjectsBySubcategory(subcategoryId: number, limit = 3): Promise<Project[]> {
  const projects = await sql<Project[]>`
    SELECT 
      id, 
      subcategory_id as "subcategoryId", 
      title, 
      slug, 
      content, 
      image_url as "imageUrl", 
      software, 
      image_ratio as "imageRatio"
    FROM projects
    WHERE subcategory_id = ${subcategoryId}
    ORDER BY id
    LIMIT ${limit}
  `
  return projects
}

// Add this function to your existing db.ts file

export async function getRelatedProjects(
  currentProjectId: number,
  subcategoryId: number,
  limit = 3,
): Promise<Project[]> {
  const projects = await sql<Project[]>`
    SELECT 
      id, 
      subcategory_id as "subcategoryId", 
      title, 
      slug, 
      content, 
      image_url as "imageUrl", 
      software, 
      image_ratio as "imageRatio"
    FROM projects
    WHERE 
      subcategory_id = ${subcategoryId} AND
      id != ${currentProjectId}
    ORDER BY id
    LIMIT ${limit}
  `
  return projects
}

// Add this new function to get all projects
export async function getAllProjects(): Promise<Project[]> {
  const projects = await sql<Project[]>`
    SELECT 
      id, 
      subcategory_id as "subcategoryId", 
      title, 
      slug, 
      content, 
      image_url as "imageUrl", 
      software, 
      image_ratio as "imageRatio"
    FROM projects
    ORDER BY id DESC
  `
  return projects
}
