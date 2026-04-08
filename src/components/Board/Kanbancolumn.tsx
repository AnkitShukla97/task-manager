import React from "react";
import { Status, Task } from "../../types";
import { STATUS_META } from "../../utils";
import TaskCard from "../TaskCard/TaskCard";

interface Props {
  status: Status;
  tasks: Task[];
  onAddTask: () => void;
}

export default function KanbanColumn({ status, tasks, onAddTask }: Props) {
  const meta = STATUS_META[status];

  return (
    <div className="w-[290px] flex-shrink-0 flex flex-col">
      {/* Column card */}
      <div
        className={`bg-[#16161F] border border-[#1E1E2E] rounded-2xl border-t-[3px] ${meta.border} p-4 mb-3 flex-1`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${meta.dot}`} />
          <span className="text-[13px] font-semibold text-zinc-100 tracking-wide">
            {meta.label}
          </span>
          <span className="ml-auto text-[11px] text-zinc-600 bg-[#1E1E2E] rounded-full px-2 py-[2px]">
            {tasks.length}
          </span>
        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-2.5">
          {tasks.length === 0 && (
            <div className="text-center text-zinc-600 text-[13px] py-6">
              No tasks here
            </div>
          )}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Add task button */}
      <button
        onClick={onAddTask}
        className="w-full py-2.5 rounded-[10px] border-[1.5px] border-dashed border-[#1E1E2E] text-zinc-600 text-[13px] hover:border-zinc-600 hover:text-zinc-400 transition-colors flex items-center justify-center gap-1.5"
      >
        <svg width="13" height="13" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 3v10M3 8h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Add task
      </button>
    </div>
  );
}
