import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import type { Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const dbPath = path.join(__dirname, '../../database.sqlite');
  console.log(`📁 Database path: ${dbPath}`);

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('✅ SQLite database connected');

  await db.exec('PRAGMA foreign_keys = ON');
  await createTables();
  
  return db;
}

async function createTables(): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  console.log('🔧 Creating database tables...');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      type TEXT CHECK(type IN ('sale', 'rent')) NOT NULL,
      category TEXT CHECK(category IN ('apartment', 'house', 'commercial')) NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      rooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      sqm REAL NOT NULL,
      floor INTEGER,
      images TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database tables created successfully');
}

export function getDatabase(): Database {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
    console.log('📴 Database connection closed');
  }
}