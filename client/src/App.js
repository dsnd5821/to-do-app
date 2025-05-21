import React, { useEffect, useState } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!text) return;
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    setText('');
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: 'PUT' });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="app-container">
      <h1>📝 My To-Do List test</h1>
      <div className="input-container">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter a task..." />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo._id)} />
            <span>{todo.text}</span>
            <button className="delete" onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
