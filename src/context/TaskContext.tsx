import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { Task, TaskAction, FilterState, Status } from "../types";
import { taskReducer, initialTasks } from "../reducer/TaskReducer";

interface TaskContextValue {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredTasks: (status: Status) => Task[];
  stats: { todo: number; inProgress: number; done: number; total: number };
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [filter, setFilter] = React.useState<FilterState>({
    priority: "all",
    tags: [],
    search: "",
  });

  const filteredTasks = (status: Status): Task[] => {
    return tasks.filter((t) => {
      if (t.status !== status) return false;
      if (filter.priority !== "all" && t.priority !== filter.priority)
        return false;
      if (
        filter.tags.length > 0 &&
        !filter.tags.some((tag) => t.tags.includes(tag))
      )
        return false;
      if (
        filter.search &&
        !t.title.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      return true;
    });
  };

  const stats = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    total: tasks.length,
  };

  return (
    <TaskContext.Provider
      value={{ tasks, dispatch, filter, setFilter, filteredTasks, stats }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used inside TaskProvider");
  return ctx;
}
