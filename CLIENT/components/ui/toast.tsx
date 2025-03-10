"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onDismiss={() => dismiss(toast.id)}
        />
      ))}
    </div>
  )
}

interface ToastProps {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
  onDismiss: () => void
}

function Toast({ id, title, description, variant = "default", onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "bg-background border rounded-lg shadow-lg p-4 transition-all duration-300 transform",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        variant === "destructive" && "border-destructive",
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={cn("font-medium text-sm", variant === "destructive" && "text-destructive")}>{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

