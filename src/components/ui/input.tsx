
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, suppressHydrationWarning = true, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-2 text-base shadow-sm transition-all duration-200 focus:ring-2 focus:ring-gold/30 focus:border-gold/50 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        suppressHydrationWarning={suppressHydrationWarning}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
