import { Task } from "@prisma/client";

interface TaskMapProps {
  tasks: Task[] | null;
}

export default function TaskMap({ tasks }: TaskMapProps) {
  return (
    <>
      {tasks?.length ? (
        <div className="flex w-full max-w-3xl flex-col items-start justify-start">
          <p className="mb-4 text-2xl font-bold text-primary">Today</p>
          {tasks.map((task) => {
            return <div>{task.title}</div>;
          })}
        </div>
      ) : (
        "empty"
      )}
    </>
  );
}
