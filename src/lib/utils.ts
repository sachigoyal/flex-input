import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAbsoluteUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
};

export const packageManagers = ["pnpm", "npm", "yarn", "bun"];
export const LOCAL_STORAGE_KEY = "flexinput-package-manager";

export const getInstallCommand = (pm: string): string => {
  const url = getAbsoluteUrl("/r/flexinput.json");

  switch (pm) {
    case "bun":
      return `bunx --bun shadcn@latest add ${url}`;
    case "npm":
      return `npx shadcn@latest add ${url}`;
    case "yarn":
      return `yarn shadcn@latest add ${url}`;
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${url}`;
    default:
      return `npx shadcn@latest add ${url}`;
  }
};