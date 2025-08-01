"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      {/* Explicitly position the viewport to be centered at the top */}
      <ToastViewport className="z-[9999] fixed top-0 left-1/2 -translate-x-1/2 flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}
