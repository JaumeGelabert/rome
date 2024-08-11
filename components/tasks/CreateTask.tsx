"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormCreateTask from "./forms/FormCreateTask";

export default function CreateTask() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="flex w-full flex-row items-center justify-start gap-1 rounded-md px-2 py-[2px] text-sm text-neutral-300 transition-colors hover:bg-neutral-100 hover:text-neutral-400">
          <Plus className="h-4 w-4" />
          New task
        </DialogTrigger>
        <DialogContent>
          <FormCreateTask />
        </DialogContent>
      </Dialog>
    </>
  );
}
