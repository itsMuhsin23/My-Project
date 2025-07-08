// Context/TaskContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define Task Type
export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  createdAt: Date;
};

// Context type
type TaskContextType = {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch from API on startup
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await response.json();

      const mapped: Task[] = data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: '',
        completed: item.completed,
        createdAt: new Date(),
      }));

      setTasks(mapped);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      const result = await response.json();

      const newTask: Task = {
        ...task,
        id: (Date.now() + Math.random()).toString(), // Local ID
        createdAt: new Date(),
      };

      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error('Add task error:', error);
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
};