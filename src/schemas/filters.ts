import { z } from "zod";

export const filtersFormSchema = z.object({
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]).optional(),
  // security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]).optional(),
  has_security: z.boolean().optional(),
  tags: z.array(z.string()),
  country: z.string().max(2).optional(),
  city: z.string().optional(),
  is_favorite: z.boolean().optional(),
  is_private: z.boolean().optional(),
  is_supposed: z.boolean().optional(),
});
