import { z } from "zod";

export const expeditionFormSchema = z.object({
  name_en: z.string().max(250).min(2, "English name is required"),
  name_uk: z.string().max(255),
  name_ru: z.string().max(255),
  description_en: z.string().max(1000).optional(),
  description_uk: z.string().max(1000).optional(),
  description_ru: z.string().max(1000).optional(),
  summary_en: z.string().max(10000).optional(),
  summary_uk: z.string().max(10000).optional(),
  summary_ru: z.string().max(10000).optional(),
  is_private: z.boolean(),
});
