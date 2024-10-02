/* eslint-disable prettier/prettier */
import React, { useReducer, useState } from 'react';

// Define the shape of a Todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the shape of our state
interface State {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

// Define action types
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' };

// Initial state
const initialState: State = {
  todos: [],
  filter: 'all',
};

// Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter((todo) => !todo.completed) };

    default:
      return state;
  }
}

// Main component
export const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const { todos, filter } = state;

  // Filter todos based on the current filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Handler for adding a new todo
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>Advanced Todo App with useReducer</h1>

      {/* Input for adding new todos */}
      <input
        type="text"
        value={inputValue}
        placeholder="Enter new todo"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <label
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
                }
              />
              {todo.text}
            </label>
            <button
              onClick={() =>
                dispatch({ type: 'REMOVE_TODO', payload: todo.id })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Filter Buttons */}
      <div>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        >
          Completed
        </button>
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};
