import { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (task.trim() === "") return;

      setTasks((prev) => [...prev, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleCompleted = (index) => {
    setTasks((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") return true;
    if (filter === "completed") return item.completed;
    if (filter === "incomplete") return !item.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="todo-box">
        <h2 className="title">To-Do List</h2>
        <input
          type="text"
          placeholder="To-Do Task"S
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="input-task"
        />

        <div>
          {filteredTasks.map((item, index) => (
            <div
              key={index}
              className="task-item"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => toggleCompleted(tasks.indexOf(item))}
            >
              <div
                className="task-circle"
                style={{
                  backgroundColor: item.completed ? "#4caf50" : "transparent",
                }}
              />
              <span className={`task-text ${item.completed ? "completed" : ""}`}>
                {item.text}
              </span>
              {hoverIndex === index && (
                <span
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(tasks.indexOf(item));
                  }}
                >
                  <small>x</small>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="filters">
          <button
            onClick={() => setFilter("all")}
            className={`filter-button ${filter === "all" ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`filter-button ${filter === "incomplete" ? "active" : ""}`}
          >
            unfinished
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
