import { getUserByEmail, getUserById, updateUsernameById } from "@/data/user";
import { sendWelcomeEmail } from "@/lib/mail";
import { createSupabaseServer } from "@/lib/supabase/server";
import { SignupFormSchema } from "@/schemas/auth/SignupFormSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedFields = SignupFormSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: true, message: validatedFields.error.message },
        { status: 404 },
      );
    }

    const { userId, username } = validatedFields.data;
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({
        isError: true,
        message: "User not found",
      });
    }

    if (user.username) {
      await updateUsernameById(userId, username);
      return NextResponse.json({
        message: "Username updated successfully",
      });
    }
    const updatedUser = await updateUsernameById(userId, username);
    if (!updatedUser) {
      return NextResponse.json({
        isError: true,
        message: "Error updating user",
      });
    }

    await sendWelcomeEmail(user.email);

    return NextResponse.json({
      message: "Username updated",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      isError: true,
    });
  }
}
