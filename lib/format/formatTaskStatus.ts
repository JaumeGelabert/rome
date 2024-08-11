import { Status } from "@prisma/client";

export const formatTaskStatus = (status: Status) => {
  const isPending = status === Status.PENDING;
  const isInProgress = status === Status.IN_PROGRESS;
  const isDone = status === Status.DONE;

  if (isPending) {
    return "Pending";
  } else if (isInProgress) {
    return "In Progress";
  } else if (isDone) {
    return "Done";
  } else {
    return "Unknown";
  }
};
