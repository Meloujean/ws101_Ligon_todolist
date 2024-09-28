import React, { useState } from 'react';

function TodoList() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  

  const addTask = () => {
    if (task !== '') {
      setTaskList([task, ...taskList]);
      setTask('');
    }
  };

  const completeTask = (index) => {
    const completedTask = taskList[index];
    setCompletedTasks([completedTask, ...completedTasks]);
    setTaskList(taskList.filter((_, idx) => idx !== index));
  };

  const deleteTask = (index) => {
    const deletedTask = taskList[index];
    setDeletedTasks([deletedTask, ...deletedTasks]);
    setTaskList(taskList.filter((_, idx) => idx !== index));
  };

  const moveToTaskList = (task, type) => {
    setTaskList([task, ...taskList]);
    if (type === 'completed') {
      setCompletedTasks(completedTasks.filter(t => t !== task));
    } else if (type === 'deleted') {
      setDeletedTasks(deletedTasks.filter(t => t !== task));
    }
  };

  const editTask = (index) => {
    setIsEditing(index);
    setEditedTask(taskList[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index] = editedTask;
    setTaskList(updatedTasks);
    setIsEditing(null);
  };

  return (
    <div className="div">
      <div className="todo-container">
        {/* Box 1 - Header */}
        <div className="header">
          <h1>TO-DO LIST</h1>
        </div>

        {/* Box 2 - Input */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter a task.."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>ADD</button>
        </div>

        {/* Box 3 - Tasks */}
        <div className="box3">
          <div className="tasks">
            {taskList.map((task, index) => (
              <div key={index} className="task-item">
                {isEditing === index ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                ) : (
                  <span>{task}</span>
                )}
                {isEditing === index ? (
                  <button className="save" onClick={() => saveTask(index)}>
                    SAVE
                  </button>
                ) : (
                  <div className="button-container">
                    <button className="done" onClick={() => completeTask(index)}>
                      DONE
                    </button>
                    <button className="edit" onClick={() => editTask(index)}>
                      EDIT
                    </button>
                    <button className="delete" onClick={() => deleteTask(index)}>
                      DELETE
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Box 4 & Box 5 - Completed and Deleted Tasks */}
        <div className="box4-container">
          {/* Box 4 - Completed Tasks */}
          <div className="completed-section">
            <h2>COMPLETED</h2>
            <div className="box4">
              <div className="tasks">
                {completedTasks.map((task, index) => (
                  <div key={index} className="task-item1">
                    <span>{task}</span>
                    <button className="up" onClick={() => moveToTaskList(task, 'completed')}>
                      UP
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Box 5 - Deleted Tasks */}
          <div className="deleted-section">
            <h2>DELETED</h2>
            <div className="box5">
              <div className="tasks">
                {deletedTasks.map((task, index) => (
                  <div key={index} className="task-item2">
                    <span>{task}</span>
                    <button className="up" onClick={() => moveToTaskList(task, 'deleted')}>
                      UP
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
