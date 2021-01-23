
import React, { useContext } from 'react';
import { TaskContext } from '../Context/TaskContextProvider';
import styles from './Footer.module.css';
import classnames from 'classnames';

const Footer = () => {
  const { filterTodo, allItems, activeItems, complitedItems, onClickSorting } = useContext(TaskContext);

  return (
    <div className={styles.wrap}>
      <button
        className={classnames({
          [styles.button]: true,
          [styles.button_active]: filterTodo === 'all',
        })}
        onClick={() => onClickSorting('all')}
      >
        Все<p className={styles.count}>{allItems.length}</p>
      </button>
      <button
        className={classnames({
          [styles.button]: true,
          [styles.button_active]: filterTodo === 'Active',
        })}
        onClick={() => onClickSorting('Active')}
      >
        Незавершенные<p className={styles.count}>{activeItems.length}</p>
      </button>
      <button
        className={classnames({
          [styles.button]: true,
          [styles.button_active]: filterTodo === 'Complited',
        })}
        onClick={() => onClickSorting('Complited')}
      >
        Выполненные<p className={styles.count}>{complitedItems.length}</p>
      </button>
    </div>
  );
};

export default Footer;
