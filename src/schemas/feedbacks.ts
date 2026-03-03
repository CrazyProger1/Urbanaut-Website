import { z } from "zod";

export const feedbackFormSchema = z.object({
  content: z.string().max(5000).min(5),
});
