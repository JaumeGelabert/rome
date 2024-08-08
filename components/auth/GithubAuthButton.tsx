"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export default function GithubAuthButton() {
  const [isLoading, startTransition] = useTransition();
  const handleAuth = () => {
    startTransition(async () => {
      const res = await axios.get("/api/v1/auth/github");
      const data = res.data;
      if (data.isError) {
        console.error(data.error);
        return;
      }
      redirect(data.url);
    });
  };
  return (
    <Button onClick={handleAuth}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Github"}
    </Button>
  );
}
