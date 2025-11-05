import { Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Layers3 className="h-7 w-7 text-current" />
      <span className="text-xl font-bold">DPX Digital</span>
    </div>
  );
}
