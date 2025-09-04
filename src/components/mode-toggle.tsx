"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModeToggleProps = {
  className?: string;
  variant?: "outline" | "default" | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export default function ModeToggle({ className, variant = "ghost", size = "lg" }: ModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <Button
      onClick={switchTheme}
      variant={variant}
      size={size}
      className={cn("aspect-square size-10 border-none cursor-pointer ", className)}
    >
      <SunIcon className="size-3 md:size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-3 md:size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}