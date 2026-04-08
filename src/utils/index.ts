import type { Priority, Status } from '../types'

export function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function daysUntil(iso?: string): number | null {
  if (!iso) return null
  return Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export function dueDateLabel(iso?: string): { label: string; color: string } {
  const d = daysUntil(iso)
  if (d === null) return { label: '', color: 'text-zinc-500' }
  if (d < 0) return { label: 'Overdue', color: 'text-red-400' }
  if (d === 0) return { label: 'Today', color: 'text-red-400' }
  if (d === 1) return { label: 'Tomorrow', color: 'text-red-400' }
  if (d <= 3) return { label: formatDate(iso), color: 'text-amber-400' }
  return { label: formatDate(iso), color: 'text-zinc-500' }
}

export const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'bg-red-500/15 text-red-400 border border-red-500/25',
  medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  low: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'High',
  medium: 'Med',
  low: 'Low',
}

export const STATUS_META: Record<Status, { label: string; dot: string; border: string; accent: string }> = {
  'todo': {
    label: 'TO DO',
    dot: 'bg-indigo-500',
    border: 'border-t-indigo-500',
    accent: 'text-indigo-400',
  },
  'in-progress': {
    label: 'IN PROGRESS',
    dot: 'bg-amber-500',
    border: 'border-t-amber-500',
    accent: 'text-amber-400',
  },
  'done': {
    label: 'DONE',
    dot: 'bg-emerald-500',
    border: 'border-t-emerald-500',
    accent: 'text-emerald-400',
  },
}

export function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}