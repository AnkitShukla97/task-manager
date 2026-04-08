import type { Task } from '../types'

const BASE = 'https://jsonplaceholder.typicode.com'

// Generic typed fetch wrapper
async function request<T>(path: string, options?: RequestInit, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...options, signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

interface TodoItem {
  id: number
  title: string
  completed: boolean
  userId: number
}

// Map JSONPlaceholder todo → our Task shape
function mapTodo(todo: TodoItem): Task {
  return {
    id: String(todo.id),
    title: todo.title,
    status: todo.completed ? 'done' : 'todo',
    priority: todo.id % 3 === 0 ? 'high' : todo.id % 2 === 0 ? 'medium' : 'low',
    tags: ['API'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const taskApi = {
  // GET /todos — fetch remote tasks (with AbortController cleanup)
  async fetchTasks(limit = 12, signal?: AbortSignal): Promise<Task[]> {
    const todos = await request<TodoItem[]>(`/todos?_limit=${limit}`, {}, signal)
    return todos.map(mapTodo)
  },

  // POST /todos — create task (optimistic — API doesn't persist)
  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const result = await request<{ id: number }>('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, completed: task.status === 'done' }),
    })
    return {
      ...task,
      id: String(result.id),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  // PUT /todos/:id — update task
  async updateTask(task: Task): Promise<Task> {
    await request(`/todos/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, completed: task.status === 'done' }),
    })
    return { ...task, updatedAt: new Date().toISOString() }
  },

  // DELETE /todos/:id
  async deleteTask(id: string): Promise<void> {
    await request(`/todos/${id}`, { method: 'DELETE' })
  },
}