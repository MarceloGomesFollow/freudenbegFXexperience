
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Droplets, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const colorThemes = [
  { id: "light", icon: Sun, label: "Light" },
  { id: "blue", icon: Droplets, label: "Blue" },
  { id: "gold", icon: Sparkles, label: "Gold" },
] as const

/** Botões de seleção de tema (light / blue / gold) — ao lado da data */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="flex items-center gap-1 h-6" />

  // Resolve active color theme (dark mode preserves last color choice)
  const activeColor = theme === "dark" ? "light" : (theme ?? "light")

  return (
    <div className="flex items-center gap-1">
      {colorThemes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          title={label}
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200",
            activeColor === id
              ? "ring-2 ring-gold bg-gold/20 text-gold scale-110"
              : "text-foreground/50 hover:text-foreground hover:bg-white/10"
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}

/** Botão único dark/light mode */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-8 w-8" />

  const isDark = resolvedTheme === "dark" || theme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Light mode" : "Dark mode"}
      className="h-8 w-8 rounded-full flex items-center justify-center glass-subtle border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-200"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
