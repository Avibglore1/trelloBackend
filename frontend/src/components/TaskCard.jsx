import axios from "axios";
import { useDraggable } from "@dnd-kit/core";

export function TaskCard({ task, user }) {
  const token = localStorage.getItem("token");
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
     data: {
    status: task.status,   
  },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  
  const statusColors = {
    todo: "bg-gray-300 text-gray-800",
    inprogress: "bg-blue-300 text-blue-800",
    review: "bg-yellow-300 text-yellow-800",
    completed: "bg-green-300 text-green-800",
  };

  const updateUser = async (value) => {
    await axios.put(
      `http://localhost:5000/tasks/${task._id}`,
      { assignedTo: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div className="bg-gray-100 p-2 rounded mb-2 shadow"
     ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <p className="font-semibold">{task.title}</p>
      <p className="text-sm text-gray-600">{task.description}</p>
    
      {/* Admin can reassign */}
      {user.role === "admin" ? (
        <select
          className="mt-2 border p-1 w-full"
          value={task.assignedTo}
          onChange={(e) => updateUser(e.target.value)}
        >
          <option value="poorti">Poorti</option>
          <option value="avinash">Avinash</option>
        </select>
      ) : (
        <small>👤 {task.assignedTo}</small>
      )}
      <span
        className={`text-xs px-2 py-1 rounded ${
          statusColors[task.status]
        }`}
      >
        {task.status}
      </span>
    </div>
  );
}