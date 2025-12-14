

import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [search, setSearch] = useState(""); 
  const [filter, setFilter] = useState("all");  
  const navigate = useNavigate();

  // Fetch tasks from API
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // New -Update task status
  const handleUpdate = async (id, completed) => {
    await API.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filter and search tasks
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className=" bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Add Task Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Task
          </h2>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              name="title"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="description"
              placeholder="Task Description"
              value={form.description}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Tasks
          </h2>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No tasks found 🚀
            </p>
          ) : (
            <ul className="space-y-4">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 border rounded-xl p-4"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <p
                      className={`text-sm mt-1 font-medium ${
                        task.completed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {task.completed ? "Completed" : "Incomplete"}
                    </p>
                  </div>

                  {/* Buttons side by side */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(task._id, task.completed)}
                      className={`px-3 py-1 rounded-lg text-white transition ${
                        task.completed
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
