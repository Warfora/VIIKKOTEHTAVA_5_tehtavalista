import * as React from 'react';

export type Task = {
  id: string;
  text: string;
  done: boolean;
};

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'set'; tasks: Task[] };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add': {
      const newTask: Task = { id: String(Date.now()), text: action.text, done: false };
      return [newTask, ...state];
    }
    case 'toggle':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'remove':
      return state.filter((t) => t.id !== action.id);
    case 'set':
      return action.tasks;
    default:
      return state;
  }
}

const STORAGE_KEY = '@myapp:tasks';

export function useTodos(initial: Task[] = []) {
  const [tasks, dispatch] = React.useReducer(reducer, initial);

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const valid = parsed.every(
          (p) =>
            p &&
            typeof p.id === 'string' &&
            typeof p.text === 'string' &&
            typeof p.done === 'boolean'
        );
        if (valid) dispatch({ type: 'set', tasks: parsed as Task[] });
      }
    } catch (e) {
    }
  }, []);

  const addTask = (text: string) => {
    if (!text || !text.trim()) return;
    dispatch({ type: 'add', text: text.trim() });
  };

  const toggleTask = (id: string) => dispatch({ type: 'toggle', id });
  const removeTask = (id: string) => dispatch({ type: 'remove', id });

  const save = () => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Failed to persist tasks to localStorage', e);
    }
  };

  return { tasks, addTask, toggleTask, removeTask, save } as const;
}

export default useTodos;