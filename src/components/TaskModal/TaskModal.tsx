import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import type { Priority, Status, Task } from "../../types";
import { generateId } from "../../utils";

interface Props {
  onClose: () => void;
  editingTask?: Task | null;
}

interface FormValues {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  tags: string;
}

// Simple validation without external lib (add zod + react-hook-form for production)
function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!v.title.trim()) errors.title = "Title is required";
  if (v.title.trim().length > 80) errors.title = "Max 80 characters";
  if (v.dueDate) {
    const due = new Date(v.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due < today) errors.dueDate = "Due date cannot be in the past";
  }
  return errors;
}

export default function TaskModal({ onClose, editingTask }: Props) {
  const { dispatch } = useTaskContext();
  const [values, setValues] = React.useState<FormValues>(() => ({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    priority: editingTask?.priority || "medium",
    status: editingTask?.status || "todo",
    dueDate: editingTask?.dueDate || "",
    tags: editingTask?.tags.join(", ") || "",
  }));
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [submitted, setSubmitted] = React.useState(false);

  function set(field: keyof FormValues, val: string) {
    setValues((v) => ({ ...v, [field]: val }));
    if (submitted) setErrors(validate({ ...values, [field]: val }));
  }

  function handleSubmit() {
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (editingTask) {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          ...editingTask,
          title: values.title.trim(),
          description: values.description.trim() || undefined,
          priority: values.priority,
          status: values.status,
          tags: values.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          dueDate: values.dueDate || undefined,
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: generateId(),
          title: values.title.trim(),
          description: values.description.trim() || undefined,
          priority: values.priority,
          status: values.status,
          tags: values.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          dueDate: values.dueDate || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }
    onClose();
  }

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-[17px] font-bold text-zinc-100">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="text-[12px] font-medium text-zinc-400 block mb-1.5">
              Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Build useTaskReducer hook"
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
              className={`w-full bg-[#13131A] border rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors
                ${errors.title ? "border-red-500/50" : "border-[#1E1E2E]"}`}
            />
            {errors.title && (
              <p className="text-[11px] text-red-400 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-[12px] font-medium text-zinc-400 block mb-1.5">
              Description
            </label>
            <textarea
              placeholder="Optional details..."
              rows={2}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors resize-none"
            />
          </div>

          {/* Priority + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-medium text-zinc-400 block mb-1.5">
                Priority
              </label>
              <select
                value={values.priority}
                onChange={(e) => set("priority", e.target.value)}
                className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2 text-[13px] text-zinc-200 outline-none focus:border-indigo-500/50 transition-colors"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] font-medium text-zinc-400 block mb-1.5">
                Column
              </label>
              <select
                value={values.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2 text-[13px] text-zinc-200 outline-none focus:border-indigo-500/50 transition-colors"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="text-[12px] font-medium text-zinc-400 block mb-1.5">
              Due date
            </label>
            <input
              type="date"
              value={values.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
              className={`w-full bg-[#13131A] border rounded-lg px-3 py-2 text-[13px] text-zinc-200 outline-none focus:border-indigo-500/50 transition-colors
                ${errors.dueDate ? "border-red-500/50" : "border-[#1E1E2E]"}`}
            />
            {errors.dueDate && (
              <p className="text-[11px] text-red-400 mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="text-[12px] font-medium text-zinc-400 block mb-1.5">
              Tags <span className="text-zinc-600">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="Hooks, API, UI"
              value={values.tags}
              onChange={(e) => set("tags", e.target.value)}
              className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-[#1E1E2E] text-zinc-500 text-[13px] hover:bg-[#1E1E2E] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white text-[13px] font-medium transition-colors"
          >
            {editingTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
