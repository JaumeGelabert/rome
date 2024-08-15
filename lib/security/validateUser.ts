import { createSupabaseServer } from "@/lib/supabase/server";

export async function validateUser() {
  const supabase = createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { isValid: false, user: null, message: "User not found" };
  }

  return { isValid: true, user: data.user, message: "" };
}
