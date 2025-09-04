import { FlexInput } from "@/components/flexinput";
import Installation from "@/components/installation";
import { PatternLayout } from "@/components/pattern-layout";

export default function Home() {
  return (
    <PatternLayout>
      <div className="flex flex-col h-full w-full">
        <div className="w-full max-w-2xl mx-auto mt-[20%] px-3 md:px-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            FlexInput
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Custom input component for your next AI application
          </p>
          <div className="my-10">
            <FlexInput />
          </div>
          <Installation />
        </div>
      </div>
    </PatternLayout>
  );
}
