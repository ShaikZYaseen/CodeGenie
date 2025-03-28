    import { useState } from 'react';

    interface Todo {
      id: string;
      text: string;
      completed: boolean;
    }

    const useTodos = () => {
      const [todos, setTodos] = useState<Todo[]>([]);

      const addTodo = (text: string) => {
        const newTodo = { id: Date.now().toString(), text, completed: false };
        setTodos([...todos, newTodo]);
      };

      const toggleTodo = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
      };

      const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
      };

      return { todos, addTodo, toggleTodo, deleteTodo };
    };

    export default useTodos;