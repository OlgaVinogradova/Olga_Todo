import React, { useState, useEffect, createContext } from 'react';

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState('all');

  const allItems = todos;
  const activeItems = todos.filter((todo) => !todo.complete);
  const complitedItems = todos.filter((todo) => todo.complete);

  useEffect(() => {
    const todoStore = JSON.parse(localStorage.getItem('todoStore'));
    if (todoStore) {
      setTodos(todoStore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoStore', JSON.stringify(todos));
  }, [todos]);

  const onClickSorting = (filterTodo) => setFilterTodo(filterTodo);

  let newItemList;
  switch (filterTodo) {
    case 'all':
      newItemList = todos;
      break;
    case 'Active':
      newItemList = todos.filter((todo) => !todo.complete);
      break;
    case 'Complited':
      newItemList = todos.filter((todo) => todo.complete);
      break;
    default:
      newItemList = todos;
  }

  return (
    <TaskContext.Provider value={{
      todos,
      setTodos,
      filterTodo,
      allItems,
      activeItems,
      complitedItems,
      onClickSorting,
      newItemList
    }}>
      {props.children}
    </TaskContext.Provider>
  );
};
