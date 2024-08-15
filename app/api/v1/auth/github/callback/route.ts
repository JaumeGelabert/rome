import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createSupabaseServer();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      // Check if user is in DB. If not, add to it. If yes, check if the user has all info.
      const userExists = await getUserByEmail(data.user.email!);
      if (!userExists) {
        await db.user.create({
          data: {
            id: data.user.id,
            email: data.user.email!,
          },
        });

        return NextResponse.redirect(
          `${origin}${next}/auth/signup?uid=${data.user.id}`,
        );
      }

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(
          `${origin}${next}/today/${userExists.username}`,
        );
      } else if (forwardedHost) {
        return NextResponse.redirect(
          `https://${forwardedHost}${next}/today/${userExists.username}`,
        );
      } else {
        return NextResponse.redirect(
          `${origin}${next}/today/${userExists.username}`,
        );
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
