"use server";

import { db } from "@/lib/db";
import { Task } from "@prisma/client";

export const getUserTasksByUserId = async (
  userId: string,
): Promise<Task[] | null> => {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId,
      },
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return null;
  }
};
