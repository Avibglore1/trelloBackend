import axios from "axios"
import { useState, useEffect } from 'react';
import {io} from "socket.io-client";
import { DndContext } from "@dnd-kit/core";
import Login from "./Login";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

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
      headers: { Authorization: token },
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

    await axios.put(
      `http://localhost:5000/tasks/${active.id}`,
      { status: over.id },
      { headers: { Authorization: token } }
    );
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );
    
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-5">
        <input
          className="p-2 border rounded w-60"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {user.role === "admin" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        )}
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {columns.map((col) => (
            <div
              key={col.id}
              id={col.id}
              className="w-64 bg-white p-3 rounded shadow"
            >
              <h2 className="font-bold mb-2">{col.title}</h2>

              {filtered
                .filter((t) => t.status === col.id)
                .map((task) => (
                  <TaskCard key={task._id} task={task} user={user} />
                ))}
            </div>
          ))}
        </div>
      </DndContext>
      {showModal && <TaskModal close={() => setShowModal(false)} />}
    </div>
  )
}

export default Dashboard