"use client"

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "@/components/theme-provider"

export function SonnerProvider() {
  const { theme } = useTheme()

  return (
    <SonnerToaster
      position="top-right"
      theme={theme as "light" | "dark" | "system"}
      closeButton
      richColors
      expand={false}
      duration={4000}
    />
  )
}

