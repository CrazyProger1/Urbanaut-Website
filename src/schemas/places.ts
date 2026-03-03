import { z } from "zod";

export const placeFormSchema = z.object({
  name: z.string().max(250).min(2),
  description: z.string().max(1000).min(0),
  is_private: z.boolean(),
  is_supposed: z.boolean(),
  tags: z.array(z.string()),
  has_roof: z.boolean().optional(),
  has_floor: z.boolean().optional(),
  has_walls: z.boolean().optional(),
  has_windows: z.boolean().optional(),
  has_doors: z.boolean().optional(),
  has_furniture: z.boolean().optional(),
  is_clean: z.boolean().optional(),
  has_security: z.boolean().optional(),
  // has_dogs: z.boolean().optional(),
  // has_weapons: z.boolean().optional(),
  // has_sensors: z.boolean().optional(),
  // has_cameras: z.boolean().optional(),
  has_internal_ceilings: z.boolean().optional(),
  built_at: z.date().optional(),
  abandoned_at: z.date().optional(),
});
