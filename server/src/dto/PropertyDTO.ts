import { z } from 'zod';

export const CreatePropertyDTO = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  type: z.enum(['sale', 'rent']),
  category: z.enum(['apartment', 'house', 'commercial']),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required")
  }),
  details: z.object({
    rooms: z.number().int().positive("Rooms must be positive"),
    bathrooms: z.number().int().positive("Bathrooms must be positive"),
    sqm: z.number().positive("Square meters must be positive"),
    floor: z.number().int().optional()
  }),
  images: z.array(z.string()).default([])
});

export const UpdatePropertyDTO = CreatePropertyDTO.partial();

export type CreatePropertyRequest = z.infer<typeof CreatePropertyDTO>;
export type UpdatePropertyRequest = z.infer<typeof UpdatePropertyDTO>;