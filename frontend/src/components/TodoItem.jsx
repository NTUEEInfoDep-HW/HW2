import "./todo-item.css";
import { useState } from "react";
import { updateTodo } from "../utils/client";
import useTodos from "../hooks/useCards";

export default function TodoItem({ id, title, onDelete, completed }) {
  const { fetchTodos } = useTodos();
  const [checked, setChecked] = useState(completed);

  const handleUpdateTodo = async (id, checked) => {
    await updateTodo(id, { checked });
    setChecked(checked);
    await fetchTodos();
  }
  return (
    <div className="todo-item">
      <div>
        <input 
          type="checkbox"
          checked={checked}
          onChange={(e) => handleUpdateTodo(id, e.target.checked)}
        />
        <p className="todo-title">{title}</p>
      </div>
      <button className="delete-todo" onClick={onDelete}>
        ❌
      </button>
    </div>
  );
}
