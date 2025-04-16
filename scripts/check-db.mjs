// ESM syntax for Node.js script
import { neon } from '@neondatabase/serverless';

// Use env variable directly
const sql = neon(process.env.DATABASE_URL || '');

async function checkDatabase() {
  try {
    // Check tables
    console.log('--- DATABASE TABLES ---');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.table(tables);

    // Check categories
    console.log('\n--- CATEGORIES ---');
    const categories = await sql`
      SELECT * FROM categories LIMIT 10
    `;
    console.table(categories);

    // Check subcategories
    console.log('\n--- SUBCATEGORIES ---');
    const subcategories = await sql`
      SELECT * FROM subcategories LIMIT 10
    `;
    console.table(subcategories);

    // Check projects
    console.log('\n--- PROJECTS ---');
    const projects = await sql`
      SELECT id, title, slug, subcategory_id FROM projects LIMIT 10
    `;
    console.table(projects);

  } catch (error) {
    console.error('Error querying database:', error);
  }
}

checkDatabase(); 