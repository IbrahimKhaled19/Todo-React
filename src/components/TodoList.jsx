import React, {useState} from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState('All');
  const filteredTasks = tasks.filter(
    (task) => {
        if (filter == "Completed") return task.completed;
        if (filter == "Active") return !task.completed;
        return true;
    }
  )
//   console.log(tasks)
  function addTask() {
    if (!text.trim()) return;
    const now = new Date();
    const newTask = {
      id: Date.now(),
      task: text,
      completed: false,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: now.toLocaleDateString("en-GB"),
    };
    setTasks([newTask, ...tasks]);
    setText("");
  }

  function toggleCompleted(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  function editTask(id , text){
    setTasks((task) => task.map((t) => {
        if(t.id === id) return {...t, task:text};
        return t;
        })
        );
        
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">TODO LIST</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={addTask}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow"
        >
          Add Task
        </button>
        <select value={filter} onChange={
            (e) => setFilter(e.target.value)} className="bg-gray-200 rounded-lg px-4 py-2 text-gray-700">
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow">
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleCompleted={toggleCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
        <div className="flex mt-4 gap-2">
          <input
            className="flex-grow p-2 border border-gray-300 rounded-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New task..."
          />
          <button
            onClick={addTask}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
