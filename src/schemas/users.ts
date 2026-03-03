import { z } from "zod";

export const editProfileFormSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(150)
    .optional()
    .or(z.literal("")),
  last_name: z.string().max(150),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(150, "Username must be at most 150 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),
  bio: z.string().max(250),
});


export const settingsFormSchema   = z.object({
  language: z.string(),
  is_notifications_enabled: z.boolean(),
  is_emails_enabled: z.boolean(),
  is_interactive_mode_enabled: z.boolean(),
});