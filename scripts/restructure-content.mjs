// Script to restructure content folder based on database structure
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

async function restructureContent() {
  try {
    console.log('Starting content restructuring...');
    
    // Create a new temp directory for restructured content
    const tempDir = path.join(projectRoot, 'content-new');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // Get data from database
    const categories = await sql`SELECT * FROM categories`;
    const subcategories = await sql`SELECT * FROM subcategories`;
    const projects = await sql`SELECT * FROM projects`;
    
    console.log(`Found ${categories.length} categories, ${subcategories.length} subcategories, and ${projects.length} projects`);
    
    // Create category folders
    for (const category of categories) {
      const categoryDir = path.join(tempDir, category.slug);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir);
        console.log(`Created category directory: ${category.slug}`);
      }
      
      // Find subcategories for this category
      const categorySubs = subcategories.filter(sub => sub.category_id === category.id);
      
      // Create subcategory folders
      for (const sub of categorySubs) {
        const subDir = path.join(categoryDir, sub.slug);
        if (!fs.existsSync(subDir)) {
          fs.mkdirSync(subDir);
          console.log(`Created subcategory directory: ${category.slug}/${sub.slug}`);
        }
        
        // Find projects for this subcategory
        const subProjects = projects.filter(proj => proj.subcategory_id === sub.id);
        
        // Process each project
        for (const project of subProjects) {
          // Check if project file exists in current structure and copy it
          // Try different possible locations
          let found = false;
          const possibleLocations = [
            path.join(contentDir, category.slug, sub.slug, `${project.slug}.md`),
            path.join(contentDir, category.name, sub.name, `${project.slug}.md`),
            path.join(contentDir, category.slug, sub.name, `${project.slug}.md`),
            path.join(contentDir, category.name, sub.slug, `${project.slug}.md`)
          ];
          
          for (const location of possibleLocations) {
            if (fs.existsSync(location)) {
              const newProjectPath = path.join(subDir, `${project.slug}.md`);
              fs.copyFileSync(location, newProjectPath);
              console.log(`Copied project file: ${project.slug}.md to ${category.slug}/${sub.slug}/`);
              found = true;
              break;
            }
          }
          
          // If no existing file, create a placeholder
          if (!found) {
            const newProjectPath = path.join(subDir, `${project.slug}.md`);
            const frontMatter = `---
title: ${project.title}
description: ${project.description || 'Project description'}
imageUrl: ${project.image_url || '/placeholder.svg'}
imageRatio: ${project.image_ratio || 'landscape'}
software: ${sub.name}
---

# ${project.title}

${project.content || 'Content for this project will be added soon.'}
`;
            fs.writeFileSync(newProjectPath, frontMatter);
            console.log(`Created placeholder for project: ${project.slug}.md in ${category.slug}/${sub.slug}/`);
          }
        }
      }
    }
    
    console.log('\nRestructuring complete!');
    console.log('New structure is in "content-new" directory.');
    console.log('Please review the changes and then:');
    console.log('1. Backup your original content folder if needed');
    console.log('2. Replace the content folder with content-new');
    
  } catch (error) {
    console.error('Error restructuring content:', error);
  }
}

restructureContent(); 