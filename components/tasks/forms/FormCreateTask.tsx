"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateTaskSchema } from "@/schemas/task/CreateTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { GitCommitVertical } from "lucide-react";

// ! TODO: Add links field. Quiero que se puedan añadir varios links, y que se muestren en una lista. Al hacer click en un link, se debería abrir en una nueva pestaña.
export default function FormCreateTask() {
  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      links: [],
      status: Status.PENDING,
      userId: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateTaskSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="border-none p-0 text-xl font-medium shadow-none focus-visible:ring-0"
                  placeholder="Name of the task"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex flex-col items-start justify-start">
          <div className="flex w-full flex-row items-center justify-start">
            <span className="flex w-32 flex-row items-center justify-start gap-[2px] text-sm text-neutral-400">
              <GitCommitVertical className="h-4 w-4" />
              <p>Status</p>
            </span>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "w-fit rounded-full px-2 py-[1px]",
                          field.value === Status.PENDING &&
                            "bg-neutral-200 text-neutral-500",
                          field.value === Status.IN_PROGRESS &&
                            "bg-blue-100 text-blue-500",
                          field.value === Status.DONE &&
                            "bg-emerald-100 text-emerald-500",
                        )}
                      >
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="flex flex-col items-start justify-start gap-2">
                      <SelectItem
                        value={Status.PENDING}
                        className="mb-1 bg-neutral-200 text-neutral-500 focus:bg-neutral-200 focus:text-neutral-600"
                      >
                        Pending
                      </SelectItem>
                      <SelectItem
                        value={Status.IN_PROGRESS}
                        className="mb-1 bg-blue-100 text-blue-500 focus:bg-blue-100 focus:text-blue-600"
                      >
                        In progress
                      </SelectItem>
                      <SelectItem
                        value={Status.DONE}
                        className="bg-emerald-100 text-emerald-500 focus:bg-emerald-100 focus:text-emerald-600"
                      >
                        Done
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="mt-4 border-none p-0 shadow-none focus-visible:ring-0"
                  placeholder="Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
