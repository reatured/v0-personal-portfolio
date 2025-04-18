// Script to create empty markdown files for missing projects
import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const contentDir = path.join(projectRoot, 'content');

// Use env variable directly
const sql = neon(process.env.DATABASE_URL || '');

async function createMissingMarkdownFiles() {
  try {
    console.log('Starting creation of missing markdown files...');
    
    // Get data from database
    const categories = await sql`SELECT * FROM categories`;
    const subcategories = await sql`SELECT * FROM subcategories`;
    const projects = await sql`SELECT * FROM projects`;
    
    console.log(`Found ${categories.length} categories, ${subcategories.length} subcategories, and ${projects.length} projects`);
    
    let createdCount = 0;
    let existingCount = 0;
    
    // Process each project
    for (const project of projects) {
      // Get the subcategory info
      const subcategory = subcategories.find(sub => sub.id === project.subcategory_id);
      if (!subcategory) {
        console.warn(`Warning: Subcategory not found for project: ${project.title} (ID: ${project.id})`);
        continue;
      }
      
      // Get the category info
      const category = categories.find(cat => cat.id === subcategory.category_id);
      if (!category) {
        console.warn(`Warning: Category not found for subcategory: ${subcategory.name} (ID: ${subcategory.id})`);
        continue;
      }
      
      // Check if the directory structure exists, create if not
      const categoryDir = path.join(contentDir, category.slug);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
        console.log(`Created category directory: ${category.slug}`);
      }
      
      const subcategoryDir = path.join(categoryDir, subcategory.slug);
      if (!fs.existsSync(subcategoryDir)) {
        fs.mkdirSync(subcategoryDir, { recursive: true });
        console.log(`Created subcategory directory: ${category.slug}/${subcategory.slug}`);
      }
      
      // Check if the project file already exists
      const projectFilePath = path.join(subcategoryDir, `${project.slug}.md`);
      if (fs.existsSync(projectFilePath)) {
        console.log(`Project file already exists: ${category.slug}/${subcategory.slug}/${project.slug}.md`);
        existingCount++;
        continue;
      }
      
      // Create a markdown file with frontmatter
      const frontMatter = `---
title: ${project.title}
description: ${project.description || 'Project description'}
imageUrl: ${project.image_url || '/placeholder.svg'}
imageRatio: ${project.image_ratio || 'landscape'}
software: ${subcategory.name}
---

# ${project.title}

${project.content || '## Project Overview\n\nAdd your project overview here.\n\n## Development Process\n\nDescribe your development process here.\n\n## Results\n\nShare the outcomes and results here.\n\n## Key Features\n\n- Feature 1\n- Feature 2\n- Feature 3'}
`;
      
      fs.writeFileSync(projectFilePath, frontMatter);
      console.log(`Created markdown file: ${category.slug}/${subcategory.slug}/${project.slug}.md`);
      createdCount++;
    }
    
    console.log('\nCreation complete!');
    console.log(`Created ${createdCount} new markdown files.`);
    console.log(`Found ${existingCount} existing markdown files.`);
    
  } catch (error) {
    console.error('Error creating markdown files:', error);
  }
}

createMissingMarkdownFiles();
