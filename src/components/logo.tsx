
import { Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Layers3 className="h-7 w-7 text-current" />
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-none">FX Experience</span>
        <span className="text-lg leading-none">
            <span className="font-bold">Follow<span className="shimmer-text-blue">Labs</span></span>
        </span>
      </div>
    </div>
  );
}
