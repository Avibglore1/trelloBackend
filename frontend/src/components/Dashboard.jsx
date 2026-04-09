import axios from "axios"
import { useState, useEffect } from 'react';
import {io} from "socket.io-client";
import { DndContext } from "@dnd-kit/core";
import Login from "./Login";
import {TaskCard} from "./TaskCard";
import {TaskModal} from "./TaskModal";
import Column from "./Column";

const socket = io("http://localhost:5000");

const columns = [
    {id: "todo", title: "Todo"},
    {id: "inprogress", title: "In Progress"},
    {id: "review", title: "Review"},
    {id: "completed", title: "Completed"}
]
function Dashboard({user}) {

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks", {
     headers: {
      Authorization: `Bearer ${token}`,
    },
    });
    setTasks(res.data);
    };

    useEffect(() => {
    fetchTasks();

    socket.on("taskCreated", fetchTasks);
    socket.on("taskUpdated", fetchTasks);

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
    };
  }, []);

    const handleDragEnd = async ({ active, over }) => {
    if (!over) return;
      const taskId = active.id;
      const newStatus = over.data.current?.status;
      if(!newStatus) return

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

    await axios.put(
      `http://localhost:5000/tasks/${taskId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );
    
  return (
  <div className="p-6 bg-gray-50 min-h-screen">
    {/* Top Bar */}
    <div className="flex justify-between items-center mb-6">
      <input
        className="px-3 py-2 border rounded-md w-64"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {user.role === "admin" && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowModal(true)}
        >
          + Add Task
        </button>
      )}
    </div>

    {/* BOARD FIX */}
    <DndContext onDragEnd={handleDragEnd}>
  <div className="flex w-full gap-6 overflow-x-auto">

    {columns.map((col) => (
      <Column
        key={col.id} id={col.id} title={col.title}
        className="flex-shrink-0 w-[300px] bg-gray-100 rounded-lg p-3"
      >
        {filtered
          .filter((t) => t.status === col.id)
          .map((task) => (
            <TaskCard key={task._id} task={task} user={user} />
          ))}
      </Column>
    ))}

  </div>
</DndContext>


    {showModal && <TaskModal close={() => setShowModal(false)} />}
  </div>
);
}

export default Dashboard