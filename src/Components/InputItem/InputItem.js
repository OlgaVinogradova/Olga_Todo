
import React, { useState, useContext } from 'react';
import { TaskContext } from '../Context/TaskContextProvider';
import styles from './InputItem.module.css';

const InputItem = () => {
  const { todos, setTodos } = useContext(TaskContext);
  const [todoName, setTodoName] = useState('');
  const [isRepeat, setIsRepet] = useState(false);

  const handleChange = (e) => {
    setTodoName(e.target.value.charAt(0).toUpperCase() + e.target.value.toLowerCase().slice(1));
  };

  const onClickAdd = (todoName) => {

    setIsRepet(false);

    todos.forEach((todo) => {
      if (todo.name === todoName) {
        setIsRepet(true);
        todoName = false;
      }
    });

    if (todoName) {
      setTodos([{ id: Math.floor(Math.random() * 100000), name: todoName, complete: false }, ...todos]);
    }
  };

  const addTodo = (e) => {
    e.preventDefault();

    if (todoName) {
      onClickAdd(todoName);
      setTodoName('');
    }
  };

  return (

    <form
      autoComplete='off'
      onSubmit={addTodo}
      className={!isRepeat ? styles.form : styles.form_error}>
      <input className={styles.input}
        type='text'
        name='todos'
        id='todos'
        required
        placeholder={!isRepeat ? 'Напиши и сделай' : 'Такая задача уже есть'}
        value={todoName}
        onChange={handleChange}
      />
      <button className={!isRepeat ? styles.button : styles.button_error} type='submit'>Создать</button>
    </form>
  );
}

export default InputItem;
