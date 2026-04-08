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

    default:
      return state
  }
}

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Set up Vite + TypeScript scaffold',
    status: 'todo',
    priority: 'high',
    tags: ['Setup'],
    dueDate: '2026-04-10',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Configure ESLint + Prettier rules',
    status: 'todo',
    priority: 'medium',
    tags: ['Config'],
    dueDate: '2026-04-11',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Build error boundary with typed fallback UI',
    status: 'todo',
    priority: 'high',
    tags: ['React'],
    dueDate: '2026-04-14',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Write unit tests with Vitest + RTL',
    status: 'todo',
    priority: 'low',
    tags: ['Testing'],
    dueDate: '2026-04-18',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Implement useReducer for task state',
    status: 'in-progress',
    priority: 'high',
    tags: ['Hooks'],
    dueDate: '2026-04-09',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'REST API service layer with typed fetch wrappers',
    status: 'in-progress',
    priority: 'medium',
    tags: ['API'],
    dueDate: '2026-04-12',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Kanban drag-and-drop with dnd-kit',
    status: 'in-progress',
    priority: 'high',
    tags: ['UI'],
    dueDate: '2026-04-13',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Define Task interface & TypeScript types',
    status: 'done',
    priority: 'low',
    tags: ['Types'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Configure Tailwind CSS with dark mode strategy',
    status: 'done',
    priority: 'medium',
    tags: ['UI'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Set up GitHub Actions CI pipeline',
    status: 'done',
    priority: 'low',
    tags: ['CI/CD'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    title: 'Path aliases in tsconfig + vite.config',
    status: 'done',
    priority: 'low',
    tags: ['Config'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'Deploy to Vercel + add live link',
    status: 'done',
    priority: 'medium',
    tags: ['Deploy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]