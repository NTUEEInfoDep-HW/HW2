import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { getTodos } from "../utils/client";

// context is a way to share data between components without having to pass props down the component tree
const TodoContext = createContext({
  todos: [],
  fetchTodos: async () => {},
});

// all data fetching and processing is done here, the rest of the app just consumes the data exposed by this provider
// when we run fetchTodos, we update the state of the provider, which causes the rest of the app to re-render accordingly
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      alert("Error: failed to fetch todos");
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// this is a custom hook, the name must start with "use"
export default function useTodos() {
  return useContext(TodoContext);
}
