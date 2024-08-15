"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CreateTaskSchema } from "@/schemas/task/CreateTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import {
  Check,
  ExternalLink,
  GitCommitVertical,
  Link2,
  Pickaxe,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

export default function FormCreateTask() {
  const [links, setLinks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      links: [],
      status: Status.PENDING,
    },
  });

  const createTaskPromise = async (
    values: z.infer<typeof CreateTaskSchema>,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post("/api/v1/task", values);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  function onSubmit(values: z.infer<typeof CreateTaskSchema>) {
    values.links = links;
    startTransition(async () => {
      toast.promise(createTaskPromise(values), {
        loading: "Creating task...",
        success: "Task created successfully",
        error: "An error occurred while creating the task",
      });
    });
  }

  const handleAddLink = () => {
    if (inputValue.trim()) {
      let formattedLink = inputValue.trim();

      if (!formattedLink.startsWith("https://")) {
        formattedLink = `https://${formattedLink}`;
      }

      setLinks([...links, formattedLink]); // Add the formatted link to the array
      setInputValue(""); // Clear the input field
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input
                  className={cn(
                    "mr-4 border-none p-0 py-1 pl-2 pr-3 text-xl font-medium shadow-none transition-all focus-visible:ring-0",
                    form.getFieldState("title").error &&
                      "bg-red-50 placeholder:text-red-500",
                  )}
                  placeholder="Name of the task"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-2 flex flex-col items-start justify-start gap-2">
          {/* Status */}
          <div className="flex w-full flex-row items-center justify-start">
            <span className="flex w-full max-w-32 flex-row items-center justify-start gap-[2px] text-sm text-neutral-400">
              <span
                className={cn(
                  "flex flex-row items-center justify-start rounded-lg py-1 pl-2 pr-3 transition-all",
                  form.getFieldState("status").error &&
                    "bg-red-50 text-red-500",
                )}
              >
                <GitCommitVertical className="h-4 w-4" />
                <p>Status</p>
              </span>
            </span>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "w-fit rounded-full border-none bg-neutral-50 px-2 py-[1px] text-neutral-400 shadow-none focus-visible:ring-0",
                          field.value === Status.PENDING &&
                            "bg-orange-100 text-orange-500",
                          field.value === Status.IN_PROGRESS &&
                            "bg-blue-100 text-blue-500",
                          field.value === Status.DONE &&
                            "bg-emerald-100 text-emerald-500",
                        )}
                      >
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="flex flex-col items-start justify-start gap-2">
                      <SelectItem
                        value={Status.PENDING}
                        className="mb-1 flex flex-row items-center justify-start gap-2 bg-orange-50 font-medium text-orange-500 focus:bg-orange-100 focus:text-orange-600"
                      >
                        <Timer className="mr-[6px] inline-block h-4 w-4" />
                        Pending
                      </SelectItem>
                      <SelectItem
                        value={Status.IN_PROGRESS}
                        className="mb-1 bg-blue-50 font-medium text-blue-500 focus:bg-blue-100 focus:text-blue-600"
                      >
                        <Pickaxe className="mr-[6px] inline-block h-4 w-4" />
                        In progress
                      </SelectItem>
                      <SelectItem
                        value={Status.DONE}
                        className="bg-emerald-50 font-medium text-emerald-500 focus:bg-emerald-100 focus:text-emerald-600"
                      >
                        <Check className="mr-[6px] inline-block h-4 w-4" />
                        Done
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          {/* Links */}
          <div className="flex w-full flex-row items-center justify-start">
            <span className="flex w-full max-w-32 flex-row items-center justify-start gap-[2px] text-sm text-neutral-400">
              <span className="flex flex-row items-center justify-start rounded-lg py-1 pl-2 pr-3 transition-all">
                <Link2 className="mr-1 h-4 w-4" />
                <p>Links</p>
              </span>
            </span>
            <Popover>
              <PopoverTrigger>
                <span className="flex w-full max-w-32 flex-row items-center justify-start gap-[2px] text-sm text-neutral-400">
                  <span
                    className={cn(
                      "flex flex-row items-center justify-start rounded-full bg-neutral-50 py-[2px] pl-2 pr-3 transition-all",
                      links.length > 0 &&
                        "bg-blue-50 pr-2 text-blue-500 transition-colors hover:bg-blue-100",
                    )}
                  >
                    {links.length > 0 ? links.length : "Add links"}
                  </span>
                </span>
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex w-full flex-row items-center justify-start gap-2">
                    <Input
                      placeholder="Link url"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button onClick={handleAddLink}>Add</Button>
                  </div>
                  <div className="w-full">
                    {links.length === 0 ? (
                      <div className="mt-4 flex w-full flex-col items-center justify-start rounded-lg bg-neutral-50 p-3">
                        <p className="text-sm text-neutral-500">No links yet</p>
                      </div>
                    ) : (
                      <div className="mt-4 flex w-full flex-col items-start justify-start">
                        <p className="text-sm font-medium">Task links:</p>
                        <ul className="mt-1 flex w-full flex-col items-start justify-start gap-1">
                          {links.map((link, index) => (
                            <span
                              key={index}
                              className="group flex w-full flex-row items-center justify-between rounded px-2 py-[2px] text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-600"
                            >
                              <Link
                                href={link}
                                className="w-full text-sm"
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {link}
                              </Link>
                              <ExternalLink className="hidden h-4 w-4 group-hover:block" />
                            </span>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
