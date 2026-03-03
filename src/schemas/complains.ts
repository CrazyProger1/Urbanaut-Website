import { z } from "zod";

export const complainFormSchema = z.object({
  content: z.string().max(5000).min(5),
});
