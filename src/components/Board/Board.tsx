import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import KanbanColumn from "./Kanbancolumn";
import TaskModal from "../TaskModal/TaskModal";
import type { Status } from "../../types";

const COLUMNS: Status[] = ["todo", "in-progress", "done"];

export default function Board() {
  const { filteredTasks } = useTaskContext();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex-1 overflow-auto p-6 flex gap-[18px] items-start">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col}
            status={col}
            tasks={filteredTasks(col)}
            onAddTask={() => setModalOpen(true)}
          />
        ))}
      </div>

      {modalOpen && <TaskModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
