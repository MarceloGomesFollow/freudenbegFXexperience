
import { cn } from "@/lib/utils";

export function FreudIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-brain-circuit", className)}
    >
      <path d="M12 5a3 3 0 1 0-5.993.142" />
      <path d="M18 5a3 3 0 1 0-5.993.142" />
      <path d="M21 12a9 9 0 0 0-18 0" />
      <path d="M12 21a9 9 0 0 0 9-9" />
      <path d="M3 12a9 9 0 0 1 .48-3" />
      <path d="M5.21 7.21a3 3 0 0 1 1.58-2.06" />
      <path d="M12 12h.01" />
      <path d="M15 13h.01" />
      <path d="M15.5 16.5h.01" />
      <path d="M12.5 17.5h.01" />
      <path d="M9.5 15.5h.01" />
      <path d="M8 13h.01" />
      <path d="M8.5 9.5h.01" />
    </svg>
  );
}
