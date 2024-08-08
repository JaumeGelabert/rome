import { cn } from "@/lib/utils";
import Link from "next/link";

interface RomeLogoProps {
  redirect?: boolean;
}

export default function RomeLogo({ redirect = false }: RomeLogoProps) {
  return (
    <Link
      href={redirect ? "/" : ""}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-2xl font-semibold shadow transition-shadow hover:shadow-none",
        !redirect && "cursor-default",
      )}
    >
      R
    </Link>
  );
}
