import React, { useState, useEffect } from "react";

// URL de la API
const API_URL = 'https://playground.4geeks.com/todo';
const API_URLTODOS = 'https://playground.4geeks.com/todo';
const API_URLDELETE = 'https://playground.4geeks.com/todo';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas del servidor
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL+"/users/rodolfoteran79");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(Array.isArray(data.todos) ? data.todos : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Función para manejar la adición de nuevas tareas
  const handleAddTask = async (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      //const newTasks = [...tasks, inputValue];
      //setTasks(newTasks);
      setInputValue('');
      
      try {
       const response = await fetch(API_URL+"/todos/rodolfoteran79", {
          method: "POST",
          body: JSON.stringify({
            label: inputValue, is_done: false

          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (response.ok){
          fetchTasks()
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Función para manejar la eliminación de tareas
  const handleRemoveTask = async (id) => {
    const newTasks = tasks.filter((_, i) => i !== id);
    setTasks(newTasks);
    console.log(id)
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        //body: JSON.stringify("string"),
        headers: {
          "Content-Type": "application/json"
        }
      });fetchTasks()
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // Función para manejar la limpieza de todas las tareas
  const handleClearAll = async () => {
    setTasks([]);
    try {
      await fetch(API_URLDELETE + "/users/rodolfoteran79", {
        method: "DELETE",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      });

    //Crear un nuevo usuario
    await fetch(`${API_URL}/users/rodolfoteran79`, { 
      method: "POST",
       body: JSON.stringify({ username: "rodolfoteran79" }), 
       headers: { "Content-Type": "application/json" } 
      });
    
    } catch (error) {
      console.error("Error clearing tasks or creating new user:", error);
    }
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
      {tasks.length === 0 ? (
        <div className="no-tasks">No hay tareas, añadir tareas</div>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="task">
            {task.label}
            <span
              className="delete-icon"
              onClick={() => handleRemoveTask(task.id)}
            >
              ❌
            </span>
          </div>
        ))
      )}
      <div className="task-footer">
        <span className="task-counter">
          Tareas pendientes: {tasks.length}
        </span>
        {tasks.length > 0 && (
          <button
            className="clear-all-button"
            onClick={handleClearAll}
          >
            Eliminar todas las Tareas
          </button>
        )}
      </div>
    </div>
  );
};

export default App;



