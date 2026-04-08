import React from "react";

const NAV_ITEMS = [
  {
    label: "Board",
    active: true,
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect
          x="9"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          fill="currentColor"
          opacity=".5"
        />
        <rect
          x="1"
          y="9"
          width="6"
          height="6"
          rx="1.5"
          fill="currentColor"
          opacity=".5"
        />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  // {
  //   label: "Timeline",
  //   active: false,
  //   icon: (
  //     <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
  //       <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
  //       <path
  //         d="M8 5v3.5l2 1.5"
  //         stroke="currentColor"
  //         strokeWidth="1.3"
  //         strokeLinecap="round"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "List",
  //   active: false,
  //   icon: (
  //     <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
  //       <path
  //         d="M2 4h12M2 8h8M2 12h10"
  //         stroke="currentColor"
  //         strokeWidth="1.3"
  //         strokeLinecap="round"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "Reports",
  //   active: false,
  //   icon: (
  //     <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
  //       <rect
  //         x="2"
  //         y="2"
  //         width="12"
  //         height="12"
  //         rx="2"
  //         stroke="currentColor"
  //         strokeWidth="1.3"
  //       />
  //       <path
  //         d="M5 8h6M8 5v6"
  //         stroke="currentColor"
  //         strokeWidth="1.3"
  //         strokeLinecap="round"
  //       />
  //     </svg>
  //   ),
  // },
];

const PROJECTS = [
  // { name: "Portfolio Site", color: "bg-indigo-500", count: 8 },
  // { name: "API Integration", color: "bg-amber-500", count: 5 },
  { name: "TaskFlow App", color: "bg-emerald-500", count: 12, active: true },
];

export default function Sidebar() {
  return (
    <aside className="w-60 flex-shrink-0 bg-[#13131A] border-r border-[#1E1E2E] flex flex-col px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white" />
            <rect
              x="9"
              y="2"
              width="5"
              height="5"
              rx="1.5"
              fill="white"
              opacity=".6"
            />
            <rect
              x="2"
              y="9"
              width="5"
              height="5"
              rx="1.5"
              fill="white"
              opacity=".6"
            />
            <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white" />
          </svg>
        </div>
        <span className="font-display text-[18px] font-bold text-white tracking-tight">
          TaskFlow
        </span>
      </div>

      {/* Navigation */}
      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-2 mb-2">
        Menu
      </p>
      <nav className="flex flex-col gap-1 mb-6">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm cursor-pointer transition-colors w-full text-left
              ${
                item.active
                  ? "bg-indigo-500/15 text-indigo-400 font-medium"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Projects */}
      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-2 mb-2">
        Projects
      </p>
      <div className="flex flex-col gap-1 mb-auto">
        {PROJECTS.map((p) => (
          <button
            key={p.name}
            className="flex items-center gap-3 px-3 py-2 rounded-[10px] hover:bg-white/[0.03] transition-colors w-full text-left"
          >
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.color}`} />
            <span
              className={`text-[13px] ${p.active ? "text-zinc-200 font-medium" : "text-zinc-500"}`}
            >
              {p.name}
            </span>
            <span
              className={`ml-auto text-[11px] rounded-full px-[7px] py-[1px]
              ${
                p.active
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-[#1E1E2E] text-zinc-600"
              }`}
            >
              {p.count}
            </span>
          </button>
        ))}
      </div>

      {/* User */}
      <div className="border-t border-[#1E1E2E] pt-4 flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-indigo-500 to-amber-400 flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0">
          AS
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-zinc-100 truncate">
            Ankit S.
          </p>
          <p className="text-[11px] text-zinc-500">Developer</p>
        </div>
        <button className="ml-auto text-zinc-600 hover:text-zinc-400 transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <circle cx="8" cy="4" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="12" r="1.2" fill="currentColor" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
