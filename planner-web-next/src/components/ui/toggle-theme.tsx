"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"

interface ToggleThemeProps {
  className?: ClassNameValue
}

export const ToggleThemeButton = ({ className }: ToggleThemeProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    } else if (systemPreference) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className={cn("", className)}>
      <div className="h-10 w-10 rounded-lg border-foreground flex justify-center items-center text-foreground">
        <MoonIcon className="h-8 block dark:hidden cursor-pointer" onClick={toggle} />
        <SunIcon className="h-8 hidden dark:block cursor-pointer" onClick={toggle} />
      </div>
    </div>
  )
}