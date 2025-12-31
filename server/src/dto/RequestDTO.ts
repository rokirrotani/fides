import { z } from 'zod';

export const CreateSellRequestDTO = z.object({
  ownerName: z.string().min(1, "Owner name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  propertyType: z.enum(['apartment', 'house', 'commercial', 'land']),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  rooms: z.number().int().positive().optional(),
  sqm: z.number().positive().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']),
  notifyZani: z.boolean().optional()
});

export const CreateBuyRequestDTO = z.object({
  buyerName: z.string().min(1, "Buyer name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  propertyType: z.enum(['apartment', 'house', 'commercial', 'any']),
  preferredCity: z.string().min(1, "Preferred city is required"),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minRooms: z.number().int().positive().optional(),
  minSqm: z.number().positive().optional(),
  urgency: z.enum(['low', 'medium', 'high']),
  notes: z.string().optional()
});

export type CreateSellRequestRequest = z.infer<typeof CreateSellRequestDTO>;
export type CreateBuyRequestRequest = z.infer<typeof CreateBuyRequestDTO>;
