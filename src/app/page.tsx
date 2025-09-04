import { FlexInput } from "@/components/flexinput";
import Installation from "@/components/installation";
import ModeToggle from "@/components/mode-toggle";
import { PatternLayout } from "@/components/pattern-layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { Github } from "@/lib/github";

export default function Home() {
  return (
    <PatternLayout>
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        <div className="absolute top-3 right-12 flex gap-2 ">
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild className="size-10 cursor-pointer">
            <a target="_blank" href={siteConfig.socials.github}>
              <Github />
            </a>
          </Button>
        </div>
        <div className="w-full max-w-2xl mx-auto px-3 md:px-0 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            FlexInput
          </h1>
          <p className="mt-1.5 text-sm md:text-base">
            Custom input component for your next AI application
          </p>
          <div className="my-8">
            <FlexInput />
          </div>
          <Installation />
        </div>
      </div>
    </PatternLayout>
  );
}
