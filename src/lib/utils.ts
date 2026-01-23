import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and merges Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a percentage string
 */
export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Formats minutes to a human-readable time string
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) {
    return `${hours}h`
  }
  return `${hours}h ${mins}min`
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
