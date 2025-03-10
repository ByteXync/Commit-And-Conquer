"use client"

import { Toaster } from "sonner"
import { useTheme } from "next-themes"

export function SonnerProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      position="top-right"
      theme={theme as "light" | "dark" | "system"}
      className="z-50"
      richColors
      closeButton
    />
  )
}