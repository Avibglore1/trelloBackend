import axios from "axios";
import { useState } from "react";

export function TaskModal({ close }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignedTo, setAssignedTo] = useState("poorti");
  const [status, setStatus] = useState("todo");

  const token = localStorage.getItem("token");

  const createTask = async () => {
    await axios.post(
      "http://localhost:5000/tasks",
      { title, description: desc, assignedTo, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded w-96">
        <h2 className="text-lg font-bold mb-3">Create Task</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="poorti">Poorti</option>
          <option value="avinash">Avinash</option>
        </select>
        <select
          className="w-full border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>
        
        <div className="flex justify-end gap-2">
          <button onClick={close}>Cancel</button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={createTask}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}