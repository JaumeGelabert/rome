"use client";

import { SignupFormSchema } from "@/schemas/auth/SignupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const userId = useSearchParams().get("uid");
  if (!userId) {
    return <>no Uid provided</>;
  }

  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      userId: userId,
    },
  });

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    startTransition(async () => {
      try {
        const res = await axios.put("/api/v1/auth/signup", values);
        const data = res.data;
        if (data.isError) {
          console.log("ERROR api call");
          // TODO: Show toast
        }
        // TODO: Show toast
        router.push("/today");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-72 space-y-1"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Username</FormLabel>
              <FormControl>
                <Input placeholder="JaumeGelabert" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
        </Button>
      </form>
      <p className="mt-2 max-w-72 text-xs text-slate-500">
        By clicking on Submit you accept our{" "}
        <Link href="" className="text-black">
          Terms & Services
        </Link>{" "}
        and{" "}
        <Link href="" className="text-black">
          Privacy Policy
        </Link>
        .
      </p>
    </Form>
  );
}
