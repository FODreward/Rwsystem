import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function getPastDate(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}
