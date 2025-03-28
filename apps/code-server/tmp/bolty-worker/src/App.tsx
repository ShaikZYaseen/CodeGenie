    import React from 'react';
    import AddTodo from './components/AddTodo';
    import TodoItem from './components/TodoItem';
    import useTodos from './hooks/useTodos';

    const App: React.FC = () => {
      const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

      return (
        <div className="container mx-auto p-4 max-w-4xl bg-green-50">
          <h1 className="text-3xl font-bold text-center text-green-900 mb-4">Todo List</h1>
          <AddTodo onAdd={addTodo} />
          {todos.length > 0 ? todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )) : (
            <p className="text-center text-green-800">No tasks added yet.</p>
          )}
        </div>
      );
    };

    export default App;