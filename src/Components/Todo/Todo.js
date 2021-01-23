import React from 'react';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import InputItem from '../InputItem/InputItem';
import { TaskContextProvider } from '../Context/TaskContextProvider';
import styles from './Todo.module.css';

const Todo = () => {

  return (
    <TaskContextProvider>
      <div className={styles.todo}>
        <h3 className={styles.title}>
          Список дел:
        </h3>
        <InputItem />
        <ItemList />
        <Footer />
      </div>
    </TaskContextProvider>
  );
};

export default Todo;
