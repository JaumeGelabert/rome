import { Status } from "@prisma/client";
import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
  links: z.array(z.string().optional()).optional(),
  status: z.enum([Status.PENDING, Status.IN_PROGRESS, Status.DONE]),
  userId: z.string(),
});
