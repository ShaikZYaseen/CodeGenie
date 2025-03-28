```tsx
    import { useState } from 'react';

    interface Todo {
      id: string;
      title: string;
      completed: boolean;
    }

    const useTodoList = () => {
      const [todos, setTodos] = useState<Todo[]>([]);

      const addTodo = (title: string) => {
        const newTodo = {
          id: Date.now().toString(),
          title,
          completed: false,
        };
        setTodos([...todos, newTodo]);
      };

      const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      };

      return { todos, addTodo, toggleTodo };
    };

    export default useTodoList;
    ```