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
  youtubeId?: string
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

export type ProfessionalArea = {
  name: string
  slug: string
  description: string
  imageUrl: string
  projectCount: number
}

/**
 * Fetches all categories from the database
 * @returns Array of Category objects
 */
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

/**
 * Fetches all subcategories for a specific category
 * @param categorySlug - The slug of the category
 * @returns Array of Subcategory objects
 */
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

/**
 * Fetches all projects for a specific subcategory
 * @param subcategorySlug - The slug of the subcategory
 * @returns Array of Project objects
 */
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
        p.description,
        p.youtube_id as "youtubeId"
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

/**
 * Fetches a category by its slug
 * @param slug - The slug of the category
 * @returns Category object or null if not found
 */
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

/**
 * Fetches a subcategory by its slug
 * @param slug - The slug of the subcategory
 * @returns Subcategory object or null if not found
 */
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

/**
 * Fetches a project by its slug
 * @param slug - The slug of the project
 * @returns Project object or null if not found
 */
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
        description,
        youtube_id as "youtubeId"
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

/**
 * Fetches the category for a specific subcategory
 * @param subcategoryId - The ID of the subcategory
 * @returns Category object or null if not found
 */
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

/**
 * Fetches the subcategory for a specific project
 * @param projectId - The ID of the project
 * @returns Subcategory object or null if not found
 */
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

/**
 * Fetches breadcrumbs (category, subcategory, project) for a specific project
 * @param projectSlug - The slug of the project
 * @returns Object containing category, subcategory, and project, or null if not found
 */
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

/**
 * Fetches the latest projects
 * @param limit - Maximum number of projects to return
 * @returns Array of Project objects
 */
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
        description,
        youtube_id as "youtubeId"
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

/**
 * Fetches top projects for a specific subcategory
 * @param subcategoryId - The ID of the subcategory
 * @param limit - Maximum number of projects to return
 * @returns Array of Project objects
 */
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
        description,
        youtube_id as "youtubeId"
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

/**
 * Fetches related projects for a specific project
 * @param currentProjectId - The ID of the current project
 * @param subcategoryId - The ID of the subcategory
 * @param limit - Maximum number of projects to return
 * @returns Array of Project objects
 */
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
        description,
        youtube_id as "youtubeId"
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

/**
 * Fetches all projects
 * @returns Array of Project objects
 */
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
        description,
        youtube_id as "youtubeId"
      FROM projects
      ORDER BY id DESC
    `
    return projects
  } catch (error) {
    console.error(`Error fetching all projects:`, error)
    return []
  }
}

/**
 * Fetches all professional areas with project counts
 * @returns Array of ProfessionalArea objects
 */
export async function getAllProfessionalAreas(): Promise<ProfessionalArea[]> {
  try {
    const areas = await executeQuery`
      SELECT 
        professional_area as "name",
        LOWER(REPLACE(REPLACE(professional_area, ' ', '-'), '&', 'and')) as "slug",
        COUNT(*) as "projectCount"
      FROM projects
      WHERE professional_area IS NOT NULL
      GROUP BY professional_area
      ORDER BY professional_area
    `

    // Add descriptions and image URLs
    return areas.map((area) => {
      // Default image and description
      let imageUrl = "/placeholder.svg"
      let description = `Projects related to ${area.name}`

      // Custom descriptions and images for known areas
      if (area.name === "3D Design") {
        imageUrl =
          "https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/a0fc2f8f-c051-45b2-be66-1af75ae39598/Wnad+Demo+GIF.gif?format=2500w"
        description = "Projects focused on 3D modeling, animation, and visualization"
      } else if (area.name === "Game Design") {
        imageUrl =
          "https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/a6bb8867-4eff-423a-8fd0-adeb4702dcb5/Menu+Scene+2.jpg?format=2500w"
        description = "Interactive game development projects"
      } else if (area.name === "Full Stack Development") {
        imageUrl =
          "https://github.com/reatured/public-assets/blob/main/Web%20Design/DOLLAR%20Chat%20Room/Dollar-chat-room.png?raw=true"
        description = "Web and application development projects"
      } else if (area.name === "Technical Artist") {
        imageUrl = "https://youtu.be/wuo36b5VgEY?si=pHcqx1tOGmuLiseM"
        description = "Projects combining technical skills with artistic vision"
      }

      return {
        ...area,
        imageUrl,
        description,
      }
    })
  } catch (error) {
    console.error("Error fetching professional areas:", error)
    return []
  }
}

/**
 * Fetches projects for a specific professional area
 * @param areaSlug - The slug of the professional area
 * @returns Array of Project objects
 */
export async function getProjectsByProfessionalArea(areaSlug: string): Promise<Project[]> {
  try {
    // Convert slug back to name format (e.g., "3d-design" to "3D Design")
    const areaName = areaSlug
      .split("-")
      .map((word) => (word === "3d" ? "3D" : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" ")

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
        p.description,
        p.youtube_id as "youtubeId",
        p.professional_area as "professionalArea"
      FROM projects p
      WHERE p.professional_area = ${areaName}
      ORDER BY p.id DESC
    `

    return projects
  } catch (error) {
    console.error(`Error fetching projects for professional area ${areaSlug}:`, error)
    return []
  }
}

/**
 * Fetches a professional area by its slug
 * @param slug - The slug of the professional area
 * @returns ProfessionalArea object or null if not found
 */
export async function getProfessionalAreaBySlug(slug: string): Promise<ProfessionalArea | null> {
  try {
    const areas = await getAllProfessionalAreas()
    const area = areas.find((a) => a.slug === slug)
    return area || null
  } catch (error) {
    console.error(`Error fetching professional area ${slug}:`, error)
    return null
  }
}
