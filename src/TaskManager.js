// src/TaskManager.js
import React, { useState } from 'react';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    ['Task 1', '2024-10-20', 'high', false],
    ['Task 2', '2024-10-18', 'medium', true],
    ['Task 3', '2024-10-25', 'low', false],
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task[3];
    if (filter === 'incomplete') return !task[3];
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorities = { high: 1, medium: 2, low: 3 };
      return priorities[a[2]] - priorities[b[2]];
    } else if (sortBy === 'dueDate') {
      return new Date(a[1]) - new Date(b[1]);
    }
    return 0;
  });

  const addTask = () => {
    if (newTaskName && newTaskDueDate) {
      setTasks([...tasks, [newTaskName, newTaskDueDate, newTaskPriority, false]]);
      setNewTaskName('');
      setNewTaskDueDate('');
      setNewTaskPriority('medium');
    }
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][3] = !updatedTasks[index][3];
    setTasks(updatedTasks);
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      <div>
        <label>
          Filter by:
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </label>
      </div>

      <div>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
        />
        <select onChange={(e) => setNewTaskPriority(e.target.value)} value={newTaskPriority}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index} className={task[3] ? 'completed' : 'incomplete'}>
            <span onClick={() => toggleCompletion(index)} style={{ cursor: 'pointer' }}>
              {task[0]} - Due: {task[1]} - Priority: {task[2]} - Status: {task[3] ? 'Completed' : 'Incomplete'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
