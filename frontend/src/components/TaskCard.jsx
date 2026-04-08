import axios from "axios";

export function TaskCard({ task, user }) {
  const token = localStorage.getItem("token");

  const updateUser = async (value) => {
    await axios.put(
      `http://localhost:5000/tasks/${task._id}`,
      { assignedTo: value },
      { headers: { Authorization: token } }
    );
  };

  return (
    <div className="bg-gray-100 p-2 rounded mb-2 shadow">
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
    </div>
  );
}