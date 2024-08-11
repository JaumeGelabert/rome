import CreateTask from "@/components/tasks/CreateTask";
import ShowDate from "@/components/today/ShowDate";
import { Task } from "@prisma/client";
import SingleTask from "@/components/tasks/SingleTask";

interface TaskMapProps {
  tasks: Task[] | null;
}

export default function TaskMap({ tasks }: TaskMapProps) {
  return (
    <>
      {tasks?.length ? (
        <div className="flex w-full max-w-3xl flex-col items-start justify-start">
          <span className="mb-4 flex flex-row items-end justify-start gap-2">
            <p className="text-2xl font-bold text-primary">Today</p>
            <ShowDate />
          </span>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            {tasks.map((task) => {
              return <SingleTask key={task.id} task={task} />;
            })}
            <CreateTask />
          </div>
        </div>
      ) : (
        "empty"
      )}
    </>
  );
}
