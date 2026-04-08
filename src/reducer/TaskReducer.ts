import type { Task,TaskAction} from '../types'
 
export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state]

    case 'UPDATE_TASK':
      return state.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : t
      )

    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.payload)

    case 'MOVE_TASK':
      return state.map(t =>
        t.id === action.payload.id
          ? { ...t, status: action.payload.status, updatedAt: new Date().toISOString() }
          : t
      )

    case 'REORDER_TASKS':
      return action.payload

    case 'SET_EDITING_TASK':
     return state.map(t =>
        t.id === action.payload?.id
          ? { ...t, ...action.payload, updatedAt: new Date().toISOString() }
          : t
      )

    default:
      return state
  }
}

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Set up Vite + TypeScript scaffold',
    status: 'done',
    priority: 'high',
    tags: [{ name: 'Setup', color: 'blue' }],
    dueDate: '2026-04-10',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
   {
    id: '2',
    title: 'Configure ESLint + Prettier rules',
    status: 'todo',
    priority: 'medium',
    tags: [{ name: 'Config', color: 'purple' }],
    dueDate: '2026-04-11',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
]