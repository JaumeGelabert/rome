import { Status } from "@prisma/client";
import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  status: z.enum([Status.PENDING, Status.IN_PROGRESS, Status.DONE]),
  description: z.string().optional(),
  links: z.array(z.string()).optional(),
});
