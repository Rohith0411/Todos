import { useState } from "react";
import "../App.css";


export default function Todos() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

    const addTask = () => {
        if (newTask.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        let newText = prompt("Edit task:", taskToEdit.text);
        if (newText && newText.trim() !== "") {
            setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
        }
    };
    

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const searchedTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <div className="todo-box">
                <h1 className="title">To-Do List</h1>
                <div className="input-group">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter a new task"
                        className="input"
                    />
                    <button onClick={addTask} className="btn add-btn">Add</button>
                </div>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search task..."
                    className="input search"
                />

                <div className="filter-group">
                    <button onClick={() => setFilter("all")} className="btn">All</button>
                    <button onClick={() => setFilter("active")} className="btn">Active</button>
                    <button onClick={() => setFilter("completed")} className="btn" >Completed</button>
                </div>

                <ul className="task-list">
                    {searchedTasks.map(task => (
                        <li key={task.id} className="task-item">
                            <span className={task.completed ? "completed" : ""} onClick={() => toggleComplete(task.id)}>
                                {task.text}
                            </span>
                            <div className="space-x-2">
                                {!task.completed && (
                                    <>
                                    <button onClick={() => editTask(task.id)} className="edit-btn">Edit</button>
                                    <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
                                    </> 
                                )}
                                </div>
                        </li>
                    ))}
                </ul>
                <p className="task-count">Tasks remaining: {tasks.filter(task => !task.completed).length}</p>
            </div>
        </div>
    );
}
