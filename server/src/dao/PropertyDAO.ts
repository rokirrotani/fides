import { Database } from 'sqlite';
import { Property, PropertyDB } from '../models/Property';
import { getDatabase } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class PropertyDAO {
  private getDb(): Database {
    return getDatabase();
  }

  async findAll(): Promise<Property[]> {
    const db = this.getDb();
    const rows = await db.all<PropertyDB[]>('SELECT * FROM properties ORDER BY created_at DESC');
    return rows.map(this.mapToProperty);
  }

  async findById(id: string): Promise<Property | null> {
    const db = this.getDb();
    const row = await db.get<PropertyDB>('SELECT * FROM properties WHERE id = ?', id);
    return row ? this.mapToProperty(row) : null;
  }

  async create(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const db = this.getDb();
    const id = uuidv4();
    const now = new Date().toISOString();

    await db.run(`
      INSERT INTO properties (
        id, title, description, price, type, category,
        address, city, province, rooms, bathrooms, sqm, floor,
        images, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      propertyData.title,
      propertyData.description || null,
      propertyData.price,
      propertyData.type,
      propertyData.category,
      propertyData.location.address,
      propertyData.location.city,
      propertyData.location.province,
      propertyData.details.rooms,
      propertyData.details.bathrooms,
      propertyData.details.sqm,
      propertyData.details.floor || null,
      JSON.stringify(propertyData.images),
      now,
      now
    ]);

    return this.findById(id) as Promise<Property>;
  }

  async update(id: string, updates: Partial<Property>): Promise<Property | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated = { ...existing, ...updates, updatedAt: new Date() };
    const db = this.getDb();
    
    await db.run(`
      UPDATE properties SET
        title = ?, description = ?, price = ?, type = ?, category = ?,
        address = ?, city = ?, province = ?, rooms = ?, bathrooms = ?,
        sqm = ?, floor = ?, images = ?, updated_at = ?
      WHERE id = ?
    `, [
      updated.title,
      updated.description || null,
      updated.price,
      updated.type,
      updated.category,
      updated.location.address,
      updated.location.city,
      updated.location.province,
      updated.details.rooms,
      updated.details.bathrooms,
      updated.details.sqm,
      updated.details.floor || null,
      JSON.stringify(updated.images),
      updated.updatedAt.toISOString(),
      id
    ]);

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const db = this.getDb();
    const result = await db.run('DELETE FROM properties WHERE id = ?', id);
    return (result.changes || 0) > 0;
  }

  private mapToProperty(row: PropertyDB): Property {
    return {
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      price: row.price,
      type: row.type,
      category: row.category,
      location: {
        address: row.address,
        city: row.city,
        province: row.province
      },
      details: {
        rooms: row.rooms,
        bathrooms: row.bathrooms,
        sqm: row.sqm,
        floor: row.floor || undefined
      },
      images: JSON.parse(row.images || '[]'),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}