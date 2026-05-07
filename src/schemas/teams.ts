import { z } from "zod";

export const teamCreateFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(250),
  description: z.string().max(1000).optional().or(z.literal("")),
  motto: z.string().max(500).optional().or(z.literal("")),
});