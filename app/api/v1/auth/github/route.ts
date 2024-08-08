import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServer();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/github/callback`,
      },
    });

    console.log("error:", error);
    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      isError: true,
    });
  }
}
