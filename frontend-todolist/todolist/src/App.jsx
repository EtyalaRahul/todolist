import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaCheck, FaPlus, FaSync } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:2030/todolist/api/todos";

  // Fetch all todos from backend
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or Update Todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    try {
      if (editId) {
        // Update existing todo
        await axios.put(`${API_URL}/${editId}`, { task, status });
        setEditId(null);
      } else {
        // Create new todo
        await axios.post(API_URL, { task, status });
      }

      setTask("");
      setStatus(false);
      fetchTodos();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTodos();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setTask(todo.task);
    setStatus(todo.status);
    setEditId(todo.id);
  };

  // Toggle Todo Status (completed/not completed)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const todo = todos.find((t) => t.id === id);
      await axios.put(`${API_URL}/${id}`, {
        task: todo.task,
        status: !currentStatus,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="cyberpunk-container">
      {/* Animated Background Elements */}
      <div className="bg-wireframe"></div>
      <div className="bg-polys">
        <div className="poly"></div>
        <div className="poly"></div>
        <div className="poly"></div>
        <div className="poly"></div>
        <div className="poly"></div>
      </div>
      <div className="bg-noise"></div>
      
      {/* Glowing particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="app-container cyberpunk-card">
        <h1 className="cyberpunk-title glitch" data-text="📝 CYBER-TODO">
          📝 CYBER-TODO
        </h1>

        {/* Add or Update Todo */}
        <form className="todo-form cyberpunk-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="cyberpunk-input"
            />
            <div className="input-highlight"></div>
          </div>
          
          <label className="cyberpunk-checkbox">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <span className="checkmark"></span>
            Completed
          </label>
          
          <button type="submit" className="cyberpunk-button">
            {editId ? (
              <>
                <FaSync /> UPDATE
              </>
            ) : (
              <>
                <FaPlus /> ADD TASK
              </>
            )}
          </button>
        </form>

        {/* Display Todo List */}
        <div className="todo-list">
          {isLoading ? (
            <div className="loading-container">
              <div className="cyberpunk-loader"></div>
              <p>SYNCING WITH SERVER...</p>
            </div>
          ) : todos.length === 0 ? (
            <p className="no-tasks cyberpunk-text">NO TASKS FOUND. ADD ONE!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item cyberpunk-item ${todo.status ? "completed" : ""} ${editId === todo.id ? "editing" : ""}`}
              >
                <div className="task-content">
                  <span
                    onClick={() => toggleStatus(todo.id, todo.status)}
                    className="task-text cyberpunk-text"
                  >
                    {todo.task}
                  </span>
                  <div className="task-meta">
                    <span className={`status-indicator ${todo.status ? "active" : ""}`}>
                      {todo.status ? "COMPLETED" : "PENDING"}
                    </span>
                  </div>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(todo)} className="edit-btn cyberpunk-btn">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="delete-btn cyberpunk-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                {/* Animated elements for todo item */}
                <div className="cyberpunk-item-glow"></div>
                {editId === todo.id && <div className="edit-glow"></div>}
              </div>
            ))
          )}
        </div>
        
        {/* Footer with stats */}
        <div className="cyberpunk-footer">
          <div className="stats">
            <span className="stat">TOTAL: {todos.length}</span>
            <span className="stat">COMPLETED: {todos.filter(t => t.status).length}</span>
            <span className="stat">PENDING: {todos.filter(t => !t.status).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;