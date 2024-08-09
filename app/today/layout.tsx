import RomeLogo from "@/components/brand/RomeLogo";
import { getUserById } from "@/data/user";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Revalidate every 10 minutes
export const revalidate = 600;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = await getUserById(data.user?.id!);
  if (!user) redirect("/auth");
  return (
    <>
      <span className="absolute left-4 top-4">
        <RomeLogo />
      </span>
      <div className="flex min-h-dvh flex-row items-start justify-center bg-falseWhite pt-36">
        {children}
      </div>
    </>
  );
}
