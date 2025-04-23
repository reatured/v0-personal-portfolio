# Portfolio Scripts Documentation

This document provides detailed information about the utility scripts used in the portfolio project.

## Table of Contents

1. [check-db.mjs](#check-dbmjs)
2. [create-missing-markdown.mjs](#create-missing-markdownmjs)
3. [export-projects-to-files.ts](#export-projects-to-filests)
4. [restructure-content.mjs](#restructure-contentmjs)

## check-db.mjs

### Purpose
This script connects to the Neon PostgreSQL database and displays information about the database tables and their contents. It's useful for debugging and verifying the database structure and data.

### Usage
\`\`\`bash
node scripts/check-db.mjs
\`\`\`

### Functions

#### `checkDatabase()`
- **Description**: Main function that queries the database and displays table information
- **Process**:
  1. Connects to the database using the `DATABASE_URL` environment variable
  2. Queries and displays all table names in the public schema
  3. Queries and displays sample data from the categories, subcategories, and projects tables
  4. Handles errors if the database connection fails

## create-missing-markdown.mjs

### Purpose
This script creates Markdown files for projects that exist in the database but don't have corresponding Markdown files in the content directory. It ensures that all projects have content files.

### Usage
\`\`\`bash
node scripts/create-missing-markdown.mjs
\`\`\`

### Functions

#### `createMissingMarkdownFiles()`
- **Description**: Main function that creates missing Markdown files
- **Process**:
  1. Connects to the database and retrieves all categories, subcategories, and projects
  2. For each project, checks if a corresponding Markdown file exists
  3. If the file doesn't exist, creates the directory structure if needed
  4. Creates a new Markdown file with frontmatter and content from the database
  5. Tracks statistics on created and existing files

## export-projects-to-files.ts

### Purpose
This TypeScript script exports all project content from the database to Markdown files in the content directory. It's useful for creating or updating the content files based on the latest database content.

### Usage
\`\`\`bash
npx ts-node scripts/export-projects-to-files.ts
\`\`\`

### Functions

#### `exportProjectsToFiles()`
- **Description**: Main function that exports projects to Markdown files
- **Process**:
  1. Retrieves all projects from the database
  2. For each project, gets the breadcrumbs to determine category and subcategory
  3. Writes the project content to a Markdown file using the `writeProjectMarkdown` function
  4. Tracks success and error counts

## restructure-content.mjs

### Purpose
This script restructures the content directory to match the database structure. It's useful when the database structure has changed or when content files need to be reorganized.

### Usage
\`\`\`bash
node scripts/restructure-content.mjs
\`\`\`

### Functions

#### `restructureContent()`
- **Description**: Main function that restructures the content directory
- **Process**:
  1. Creates a new temporary directory for the restructured content
  2. Retrieves all categories, subcategories, and projects from the database
  3. Creates the directory structure based on the database hierarchy
  4. For each project, tries to find the existing content file in various possible locations
  5. If found, copies the file to the new structure; if not, creates a placeholder
  6. Provides instructions for reviewing and replacing the content directory
\`\`\`

## 8. Add Comments to Database Functions

Let's update the database functions with detailed comments:
