import { z } from "zod";

export const SignupFormSchema = z.object({
  userId: z.string(),
  username: z.string().min(1).max(30),
});
