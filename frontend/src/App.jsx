import { useState, useEffect } from 'react'
import TodoItem from "./components/TodoItem";
import './App.css'
import useTodos from './hooks/useCards';
import { createTodo, deleteTodo } from './utils/client';

function App() {
  const { todos, fetchTodos } = useTodos();
  const [todoTitle, setTodoTitle] = useState("");

  const addTodo = async () => {
    if (todoTitle === "") {
      alert("Please enter a title for your todo.");
      return;
    }
    await createTodo({
      title: todoTitle
    });
    setTodoTitle("");
    await fetchTodos();
  };

  const hanleDeleteTodo = async (id) => {
    await deleteTodo(id);
    await fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <h1>📝 Todo List</h1>
      <div id="todo-input-container">
        <input
          type="text"
          id="todo-input"
          placeholder="new todo"
          tabIndex={1}
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button id="todo-add" tabIndex={3} onClick={addTodo}>
          add
        </button>
      </div>
      <section id="todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onDelete={() => hanleDeleteTodo(todo.id)}
          />
        ))}
      </section>
    </>
  )
}

export default App
