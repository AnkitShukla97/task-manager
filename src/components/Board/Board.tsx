import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import KanbanColumn from "./Kanbancolumn";
import TaskModal from "../TaskModal/TaskModal";
import type { Status, Task } from "../../types";

const COLUMNS: Status[] = ["todo", "in-progress", "done"];

export default function Board() {
  const { filteredTasks } = useTaskContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <>
      <div className="flex-1 overflow-auto p-6 flex gap-[18px] items-start">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col}
            status={col}
            tasks={filteredTasks(col)}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
          />
        ))}
      </div>

      {modalOpen && (
        <TaskModal
          onClose={handleCloseModal}
          editingTask={editingTask}
        />
      )}
    </>
  );
}
