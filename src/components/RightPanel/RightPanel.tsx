import { useTaskContext } from "../../context/TaskContext";
import { useDueSoon } from "../../hooks";
import { dueDateLabel, TAG_COLOR_STYLES } from "../../utils";

export default function RightPanel() {
  const { stats, tasks, setFilter, filter } = useTaskContext();
  const dueSoon = useDueSoon(tasks);
  const pct = Math.round((stats.done / (stats.total || 1)) * 100);

  // Get unique tags from all tasks
  const allTags = Array.from(
    new Map(
      tasks.flatMap((task) => task.tags).map((tag) => [tag.name, tag]),
    ).values(),
  );

  function filterByTag(tagName: string) {
    setFilter((f) => ({
      ...f,
      tags: f.tags.includes(tagName)
        ? f.tags.filter((t) => t !== tagName)
        : [...f.tags, tagName],
    }));
  }

  return (
    <aside className="w-[268px] flex-shrink-0 border-l border-[#1E1E2E] p-5 overflow-y-auto flex flex-col gap-5 bg-[#0D0D12]">
      {/* Progress */}
      <section>
        <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
          Progress
        </p>
        <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-4">
          <div className="flex items-end gap-1.5 mb-3">
            <span className="font-display text-[32px] font-bold text-zinc-100 leading-none">
              {pct}
            </span>
            <span className="text-sm text-zinc-500 mb-1">%</span>
          </div>
          <div className="h-1.5 bg-[#1E1E2E] rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-base font-semibold text-indigo-400">
                {stats.todo}
              </p>
              <p className="text-[10px] text-zinc-600">To do</p>
            </div>
            <div>
              <p className="text-base font-semibold text-amber-400">
                {stats.inProgress}
              </p>
              <p className="text-[10px] text-zinc-600">Active</p>
            </div>
            <div>
              <p className="text-base font-semibold text-emerald-400">
                {stats.done}
              </p>
              <p className="text-[10px] text-zinc-600">Done</p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority breakdown */}
      <section>
        <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
          By Priority
        </p>
        <div className="flex flex-col gap-2">
          {(["high", "medium", "low"] as const).map((p) => {
            const count = tasks.filter((t) => t.priority === p).length;
            const pct = Math.round((count / (stats.total || 1)) * 100);
            const barColor =
              p === "high"
                ? "bg-red-500"
                : p === "medium"
                  ? "bg-amber-500"
                  : "bg-emerald-500";
            return (
              <div key={p} className="flex items-center gap-2.5">
                <span className="text-[12px] text-zinc-500 w-7 capitalize">
                  {p === "medium"
                    ? "Med"
                    : p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
                <div className="flex-1 h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[12px] text-zinc-500 w-3 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Due soon */}
      {dueSoon.length > 0 && (
        <section>
          <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
            Due Soon
          </p>
          <div className="flex flex-col gap-2">
            {dueSoon.slice(0, 4).map((task) => {
              const due = dueDateLabel(task.dueDate);
              const barColor =
                due.color === "text-red-400"
                  ? "bg-red-500"
                  : due.color === "text-amber-400"
                    ? "bg-amber-500"
                    : "bg-indigo-500";
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-2.5 p-2.5 bg-[#16161F] border border-[#1E1E2E] rounded-[10px]"
                >
                  <div
                    className={`w-[3px] h-9 rounded-sm flex-shrink-0 ${barColor}`}
                  />
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-zinc-200 truncate leading-snug">
                      {task.title}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${due.color}`}>
                      {due.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tags filter */}
      {allTags.length > 0 && (
        <section>
          <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
            Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => {
              const style = TAG_COLOR_STYLES[tag.color];
              const isActive = filter.tags.includes(tag.name);
              return (
                <button
                  key={tag.name}
                  onClick={() => filterByTag(tag.name)}
                  className={`text-[11px] px-[7px] py-[3px] rounded-[6px] transition-all cursor-pointer font-medium border
                    ${
                      isActive
                        ? `${style.bg} ${style.text} ${style.border}`
                        : `${style.bg} ${style.text} opacity-60 hover:opacity-100`
                    }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </aside>
  );
}
