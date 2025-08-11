"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PinInputProps {
  id?: string
  name?: string
  length: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  required?: boolean
  className?: string
}

const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  ({ id, name, length, value, onChange, disabled, required, className, ...props }, ref) => {
    const [pins, setPins] = React.useState<string[]>(Array(length).fill(""))
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useEffect(() => {
      const newPins = value.split("").slice(0, length)
      while (newPins.length < length) {
        newPins.push("")
      }
      setPins(newPins)
    }, [value, length])

    const handleChange = (index: number, newValue: string) => {
      if (newValue.length > 1) return

      const newPins = [...pins]
      newPins[index] = newValue
      setPins(newPins)
      onChange(newPins.join(""))

      // Auto-focus next input
      if (newValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !pins[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }

    return (
      <div ref={ref} className={cn("flex gap-2", className)} {...props}>
        {pins.map((pin, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            id={index === 0 ? id : undefined}
            name={index === 0 ? name : undefined}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={pin}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            required={required && index === 0}
            className="w-12 h-12 text-center border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        ))}
      </div>
    )
  },
)
PinInput.displayName = "PinInput"

export { PinInput }
