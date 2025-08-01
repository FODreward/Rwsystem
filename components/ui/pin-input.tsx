"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface PinInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  length?: number
  value: string
  onChange: (value: string) => void
}

const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  ({ length = 4, value, onChange, className, disabled, ...props }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>(Array(length).fill(null))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value
      if (!/^\d*$/.test(newValue)) {
        // Only allow digits
        return
      }

      const newPinArray = value.split("")
      newPinArray[index] = newValue.slice(-1) // Take only the last character if multiple are pasted
      const newPin = newPinArray.join("")

      onChange(newPin)

      // Move to next input if a digit was entered and it's not the last input
      if (newValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        // If backspace is pressed and current input is empty, move to previous input
        inputRefs.current[index - 1]?.focus()
      }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Select content on focus for easier input replacement
      e.target.select()
    }

    return (
      <div className="flex space-x-2 justify-center">
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="tel" // Use "tel" for numeric keyboard on mobile
            inputMode="numeric" // Hint for numeric keyboard
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={handleFocus}
            disabled={disabled}
            className={cn(
              "w-12 h-12 text-center text-2xl font-bold",
              "border border-gray-300 rounded-md focus:border-primary-600 focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50",
              className,
            )}
            aria-label={`PIN digit ${index + 1}`}
            {...props}
          />
        ))}
      </div>
    )
  },
)
PinInput.displayName = "PinInput"

export { PinInput }
