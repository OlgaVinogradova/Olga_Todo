import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';
import styles from './Item.module.css';

const Item = ({ todo, id, checkComplete, handleEditTodos, handleOnDelete }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo.name);

  const handleOnEdit = () => {
    setEditValue(todo.name);
    setOnEdit(true);
  };

  const handleSave = (id) => {
    setOnEdit(false);
    if (editValue) {
      handleEditTodos(editValue, id);
    } else {
      setEditValue(todo.name);
    }
  };

  if (onEdit) {
    return (
      <li className={styles.list}>
        <input
          type='text'
          id={editValue}
          value={editValue}
          name='editValue'
          onChange={(e) => setEditValue(e.target.value.charAt(0).toUpperCase() + e.target.value.toLowerCase().slice(1))}
        />
        <div className={styles.save}>
          <FiSave
            onClick={() => handleSave(id)}
          />
        </div>
      </li>
    );
  } else {
    return (
      <li className={styles.list}>
        <label htmlFor={id}
          className={todo.complete ? styles.active : styles.item}>
          <input
            type='checkbox'
            id={id}
            checked={todo.complete}
            onChange={() => checkComplete(id)}
          />
          {todo.name}
        </label>
        <div className={styles.btn}>
          <div className={todo.complete ? styles.btn_done : styles.edit}>
            <FiEdit
              onClick={handleOnEdit}
            />
          </div>
          <div className={styles.del}>
            <AiOutlineDelete
              onClick={() => handleOnDelete(todo.id)}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default Item;
