    import React, { useState } from 'react';

    interface AddTodoProps {
      onAdd: (text: string) => void;
    }

    const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
      const [text, setText] = useState('');

      const handleSubmit = () => {
        if (text.trim()) {
          onAdd(text);
          setText('');
        }
      };

      return (
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-green-300 rounded-l outline-none focus:ring-2 focus:ring-green-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            onClick={handleSubmit}
            className="px-8 bg-green-600 text-white rounded-r hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300"
          >
            Add
          </button>
        </div>
      );
    };

    export default AddTodo;