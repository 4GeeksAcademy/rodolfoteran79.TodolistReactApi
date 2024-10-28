import React, { useState } from "react";

//include images into your bundle


//create your first component


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-app">
      <h1>LISTA DE TAREAS</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTask}
        placeholder="Ingresa Nueva Tarea"
      />
      <ul>
        {tasks.length === 0 ? (
          <li className="no-tasks">No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="task">
              {task}
              <span
                className="delete-icon"
                onClick={() => handleRemoveTask(index)}
              >
                &#10060;
              </span>
            </li>
          ))
        )}
      </ul>
	  <div className="task-counter">
        Tareas pendientes: {tasks.length}
      </div>
    </div>
  );
};

export default App;
