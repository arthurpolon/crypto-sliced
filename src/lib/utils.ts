import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stopPropagation<T extends { stopPropagation: () => any }>(
  callback?: (event: T) => void
) {
  return (event: T) => {
    event.stopPropagation()

    if (callback) callback(event)
  }
}

export function preventDefault<T extends { preventDefault: () => any }>(
  callback?: (event: T) => void
) {
  return (event: T) => {
    event.preventDefault()

    if (callback) callback(event)
  }
}
