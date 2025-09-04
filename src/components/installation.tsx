"use client";

import { Check, Clipboard, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  cn,
  LOCAL_STORAGE_KEY,
  packageManagers,
  getInstallCommand,
} from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Installation() {
  const [packageManager, setPackageManager] = useState<string>("unspecified");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const pm = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (pm && packageManagers.includes(pm)) {
      setPackageManager(pm);
    } else {
      setPackageManager("bun");
    }
  }, []);

  const handleClick = (pm: string) => {
    setPackageManager(pm);
    localStorage.setItem(LOCAL_STORAGE_KEY, pm);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getInstallCommand(packageManager));
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-muted rounded-md">
      <div className="flex items-center justify-between border-b border-border/50 p-2.5">
        <div className="flex items-center gap-2">
          <div className="size-3.5 flex items-center justify-center bg-foreground/80">
            <Terminal className="size-2.5 text-muted" />
          </div>
          {packageManagers.map((pm) => (
            <Button
              key={pm}
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs w-auto h-auto font-mono text-muted-foreground px-1 py-0.5 rounded border border-transparent",
                packageManager === pm && "border-foreground/20 text-foreground"
              )}
              onClick={() => handleClick(pm)}
            >
              {pm}
            </Button>
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="size-4 p-0 cursor-pointer"
              onClick={handleCopy}
            >
              {isCopied ? (
                <Check className="size-3.5" />
              ) : (
                <Clipboard className="size-3.5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="pl-3 py-2.5">
        <pre
          className="text-xs font-mono overflow-x-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          <code>{getInstallCommand(packageManager)}</code>
        </pre>
      </div>
    </div>
  );
}
