import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const updateUsernameById = async (id: string, username: string) => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
