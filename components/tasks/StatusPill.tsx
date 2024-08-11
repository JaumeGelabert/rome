import { cn } from "@/lib/utils";
import { Status } from "@prisma/client";
import { formatTaskStatus } from "@/lib/format/formatTaskStatus";

interface StatusPillProps {
  status: Status;
}

export default function StatusPill({ status }: StatusPillProps) {
  const isPending = status === Status.PENDING;
  const isInProgress = status === Status.IN_PROGRESS;
  const isDone = status === Status.DONE;

  return (
    <span
      className={cn(
        "rounded-full px-2 py-[1px] text-sm",
        isPending && "bg-neutral-200 text-neutral-500",
        isInProgress && "bg-blue-100 text-blue-500",
        isDone && "bg-emerald-100 text-emerald-500",
      )}
    >
      {formatTaskStatus(status)}
    </span>
  );
}
