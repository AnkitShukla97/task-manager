export type Priority = 'high' | 'medium' | 'low'
export type Status = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description?: string
  status: Status
  priority: Priority
  tags: string[]
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  color: string
  taskCount: number
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { id: string; status: Status } }
  | { type: 'REORDER_TASKS'; payload: Task[] }
  | { type: 'SET_EDITING_TASK'; payload: Task | null }

export interface FilterState {
  priority: Priority | 'all'
  tags: string[]
  search: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
  loading: boolean
}