
import React, { useContext } from 'react';
import Item from '../Item/Item';
import { TaskContext } from '../Context/TaskContextProvider';
import styles from './ItemList.module.css';


const ItemList = () => {
  const { todos, setTodos, newItemList } = useContext(TaskContext);

  const switchComplete = (id) => {
    const newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
    });
    setTodos(newTodos);
  };

  const handleEditTodos = (editValue, id) => {
    const newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.name = editValue;
      }
    });
    setTodos(newTodos);
  };

  const handleOnDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };



  return (
    <div className={styles.wrap} >
      {newItemList.length > 0 ? (
        <ul className={styles.item_list}>
          {newItemList.map((todo) => {
            return <Item
              key={todo.id}
              todo={todo}
              id={todo.id}
              checkComplete={switchComplete}
              handleEditTodos={handleEditTodos}
              handleOnDelete={handleOnDelete}
            />;
          })}
        </ul>)
        : (
          <div className={styles.no_todo}>Важных дел нет</div>
        )
      }
    </div>
  );
};

export default ItemList;
