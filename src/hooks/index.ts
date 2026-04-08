import { useState, useEffect, useCallback } from 'react'
import { Task } from '@types'

// Persist tasks to localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // quota exceeded — fail silently
    }
  }, [key, value])

  return [value, setValue] as const
}

// Debounce hook — used for search input
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// Tasks due soon (within 3 days)
export function useDueSoon(tasks: Task[]): Task[] {
  return tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false
    const due = new Date(t.dueDate)
    const diff = (due.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 3
  })
}

// Generate unique id
export function useId(): () => string {
  return useCallback(() => `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, [])
}