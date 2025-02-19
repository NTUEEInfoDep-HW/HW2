import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api"
});

export function getTodos() {
  return client.get("/todos");
}

export function createTodo(input) {
  return client.post("/todos", input);
}

export function updateTodo(id, input) {
  return client.put(`/todos/${id}`, input);
}

export function deleteTodo(id) {
  return client.delete(`/todos/${id}`);
}
