import { db } from "@/lib/db";
import { validateUser } from "@/lib/security/validateUser";
import { CreateTaskSchema } from "@/schemas/task/CreateTaskSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { isValid, user, message } = await validateUser();
    if (!isValid || !user) {
      return NextResponse.json({ error: true, message }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = CreateTaskSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: true, message: validatedFields.error.message },
        { status: 404 },
      );
    }

    const { status, title, description, links } = validatedFields.data;

    if (links && links.length > 0) {
    }

    const newTask = await db.task.create({
      data: {
        title,
        status,
        description,
        userId: user.id,
        links:
          links && links.length > 0
            ? {
                create: links.map((link) => ({
                  url: link,
                })),
              }
            : undefined,
      },
    });
    console.log(newTask);
    return NextResponse.json({ isError: false, data: newTask });
  } catch (error: any) {
    return NextResponse.json({ isError: true, message: error.message });
  }
}
