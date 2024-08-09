import TaskMap from "@/components/tasks/TaskMap";
import { getUserTasksByUsername } from "@/data/tasks";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface TodayPageProps {
  params: {
    username: string;
  };
}

export async function generateStaticParams() {
  const usernames = await db.user.findMany({
    select: {
      username: true,
    },
  });

  return usernames.map((user) => ({ username: user.username }));
}

export default async function TodayPage({ params }: TodayPageProps) {
  const { username } = params;
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = await getUserById(data.user?.id!);
  if (user?.username !== username) {
    redirect("/auth");
  }

  const tasks = await getUserTasksByUsername(username);

  return (
    <>
      <TaskMap tasks={tasks} />
    </>
  );
}
