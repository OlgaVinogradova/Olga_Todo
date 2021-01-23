import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Todo from '../Todo/Todo';
import About from '../About/About';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.wrap}>
        <div className={styles.sidebar}>
          <NavLink exact to='/' className={styles.link} activeClassName={styles.active}>Обо мне</NavLink>
          <NavLink to='/todo' className={styles.link} activeClassName={styles.active}>Дела</NavLink>
        </div>
        <div className={styles.content}>
          <Route path='/' exact component={About} />
          <Route path='/todo' component={Todo} />
        </div>
      </div>
    </Router>);
};

export default App;
