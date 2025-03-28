    import React from 'react';

    interface TodoItemProps {
      todo: { id: string; text: string; completed: boolean };
      onToggle: (id: string) => void;
      onDelete: (id: string) => void;
    }

    const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
      return (
        <div className={`flex justify-between items-center px-4 py-2 my-2 rounded-lg shadow ${todo.completed ? 'bg-green-300' : 'bg-green-100'}`}>
          <span className={`flex-1 text-lg ${todo.completed ? 'text-green-800 line-through' : 'text-green-900'}`}>
            {todo.text}
          </span>
          <div>
            <button
              onClick={() => onToggle(todo.id)}
              className={`text-sm py-1 px-3 rounded-full ${todo.completed ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600'} transition-colors duration-200 ease-in-out`}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="ml-2 py-1 px-3 text-sm text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      );
    };

    export default TodoItem;