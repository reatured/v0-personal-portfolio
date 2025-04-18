import { getAllProjects, getBreadcrumbsForProject } from "../lib/db"
import { writeProjectMarkdown } from "../lib/markdown"

async function exportProjectsToFiles() {
  try {
    console.log("Starting export of projects to markdown files...")

    // Get all projects
    const projects = await getAllProjects()
    console.log(`Found ${projects.length} projects to export`)

    let successCount = 0
    let errorCount = 0

    // Process each project
    for (const project of projects) {
      try {
        // Get breadcrumbs to get category and subcategory info
        const breadcrumbs = await getBreadcrumbsForProject(project.slug)

        if (!breadcrumbs) {
          console.error(`Could not find breadcrumbs for project: ${project.slug}`)
          errorCount++
          continue
        }

        const { category, subcategory } = breadcrumbs

        // Write project to file
        const result = await writeProjectMarkdown(category.slug, subcategory.slug, project.slug, project)

        if (result.success) {
          console.log(`Successfully exported: ${category.slug}/${subcategory.slug}/${project.slug}`)
          successCount++
        } else {
          console.error(`Failed to export: ${project.slug}`, result.error)
          errorCount++
        }
      } catch (error) {
        console.error(`Error processing project ${project.slug}:`, error)
        errorCount++
      }
    }

    console.log(`Export complete. Success: ${successCount}, Errors: ${errorCount}`)
  } catch (error) {
    console.error("Export failed:", error)
  }
}

// Run the export
exportProjectsToFiles()
