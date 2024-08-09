import { db } from "@/lib/db";

export const getUserTasksByUserId = async (userId: string) => {
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

export const getUserTasksByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return null;
    }
    const tasks = await db.task.findMany({
      where: {
        userId: user.id,
      },
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return null;
  }
};
