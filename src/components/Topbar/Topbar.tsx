import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { useDebounce } from "../../hooks";
import TaskModal from "../TaskModal/TaskModal";

export default function Topbar() {
  const { stats, setFilter } = useTaskContext();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const debounced = useDebounce(search);

  React.useEffect(() => {
    setFilter((f) => ({ ...f, search: debounced }));
  }, [debounced, setFilter]);

  return (
    <>
      <header className="h-16 border-b border-[#1E1E2E] flex items-center px-7 gap-4 flex-shrink-0 bg-[#0D0D12]">
        <div>
          <h1 className="font-display text-[19px] font-bold text-zinc-100 tracking-tight leading-tight">
            TaskFlow App
          </h1>
          <p className="text-xs text-zinc-500">
            {stats.total} tasks · Updated just now
          </p>
        </div>

        {/* Search */}
        <div className="ml-auto flex items-center gap-2 bg-[#13131A] border border-[#1E1E2E] rounded-[10px] px-3 py-2 w-56">
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 16 16"
            className="text-zinc-600 flex-shrink-0"
          >
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M11 11l3 3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-zinc-300 placeholder-zinc-600 outline-none w-full"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-zinc-600 hover:text-zinc-400 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Add Task */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 text-[12px] font-medium text-indigo-400 bg-indigo-500/12 border border-indigo-500/25 rounded-lg px-3.5 py-[7px] hover:bg-indigo-500/20 transition-colors cursor-pointer"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 16 16">
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Add Task
        </button>
      </header>

      {modalOpen && <TaskModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
