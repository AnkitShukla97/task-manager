import { TaskProvider } from "./context/TaskContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import Board from "./components/Board/Board";
import RightPanel from "./components/RightPanel/RightPanel";

export default function App() {
  return (
    <TaskProvider>
      <div className="flex h-screen bg-[#0D0D12] text-zinc-100 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <div className="flex flex-1 overflow-hidden">
            <Board />
            <RightPanel />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}
