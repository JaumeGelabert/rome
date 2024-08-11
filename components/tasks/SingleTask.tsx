import { Task } from "@prisma/client";
import { File, FileText } from "lucide-react";
import StatusPill from "./StatusPill";

interface SingleTaskProps {
  task: Task;
}

export default function SingleTask({ task }: SingleTaskProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between rounded-md px-2 py-[2px] hover:bg-neutral-100">
      <span className="flex flex-row items-center justify-start gap-1">
        {task.description ? (
          <FileText className="h-5 w-5 text-neutral-400" />
        ) : (
          <File className="h-5 w-5 text-neutral-400" />
        )}
        <p className="font-medium">{task.title}</p>
      </span>
      <StatusPill status={task.status} />
    </div>
  );
}
