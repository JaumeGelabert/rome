import TaskMap from "@/components/tasks/TaskMap";
import { getTaskByTaskId, getUserTasksByUsername } from "@/data/tasks";
import { getUserByUsername } from "@/data/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface TodayPageProps {
  params: {
    username: string;
    taskId: string;
  };
}

export async function generateStaticParams() {
  const tasks = await db.task.findMany({
    select: {
      id: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return tasks.map((task) => ({
    username: task.user.username,
    taskId: task.id,
  }));
}

export default async function TodayPage({ params }: TodayPageProps) {
  const { username, taskId } = params;
  const user = await getUserByUsername(username);
  const task = await getTaskByTaskId(taskId);
  if (!task) {
    // TODO: Add redirect to error page
    return;
  }
  if (user?.id !== task?.userId) {
    // TODO: Add redirect to error page
    redirect("/auth");
  }

  return (
    <>
      <p>{task.title}</p>
    </>
  );
}
