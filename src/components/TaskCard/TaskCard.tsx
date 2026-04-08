import React, { useState } from "react";
import type { Task, Status } from "../../types";
import { PRIORITY_STYLES, PRIORITY_LABEL, dueDateLabel } from "../../utils";
import { useTaskContext } from "../../context/TaskContext";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { dispatch } = useTaskContext();
  const [hovered, setHovered] = useState(false);
  const due = dueDateLabel(task.dueDate);
  const isDone = task.status === "done";

  function cycleStatus() {
    const next: Record<Status, Status> = {
      todo: "in-progress",
      "in-progress": "done",
      done: "todo",
    };
    dispatch({
      type: "MOVE_TASK",
      payload: { id: task.id, status: next[task.status] },
    });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: "DELETE_TASK", payload: task.id });
  }

  return (
    <div
      className={`group relative rounded-[10px] p-3 border cursor-pointer transition-all
        ${
          isDone
            ? "opacity-60 bg-[#1A1A26] border-[#1E1E2E]"
            : hovered
              ? "bg-[#1E1E2B] border-[#2A2A3E]"
              : "bg-[#1A1A26] border-[#1E1E2E]"
        }
        ${task.status === "in-progress" ? "border-amber-500/20 bg-amber-500/[0.03]" : ""}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Delete button — appears on hover */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-red-400 text-xs"
      >
        ✕
      </button>

      <div className="flex items-start gap-2 mb-2.5">
        {/* Checkbox */}
        <button
          onClick={cycleStatus}
          className={`mt-[2px] w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center transition-colors
            ${
              isDone
                ? "bg-emerald-500"
                : task.status === "in-progress"
                  ? "border-[1.5px] border-amber-500 bg-amber-500/15"
                  : "border-[1.5px] border-[#2A2A3E] hover:border-indigo-500/50"
            }`}
        >
          {isDone && (
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5l2.5 2.5L8 3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Title */}
        <span
          className={`text-[13px] font-medium leading-snug pr-4
          ${isDone ? "line-through text-zinc-500" : "text-zinc-100"}`}
        >
          {task.title}
        </span>
      </div>

      {/* In-progress bar */}
      {task.status === "in-progress" && (
        <div className="mb-2.5">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-zinc-500">Progress</span>
            <span className="text-[11px] text-amber-400 font-medium">
              In progress
            </span>
          </div>
          <div className="h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
            <div className="h-full w-2/5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className={`text-[10px] font-medium px-[7px] py-[2px] rounded-[6px] ${PRIORITY_STYLES[task.priority]}`}
        >
          {PRIORITY_LABEL[task.priority]}
        </span>
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-[7px] py-[2px] rounded-[6px] bg-indigo-500/10 text-indigo-400"
          >
            {tag}
          </span>
        ))}
        {due.label && (
          <span className={`ml-auto text-[11px] ${due.color}`}>
            {due.label}
          </span>
        )}
      </div>
    </div>
  );
}
