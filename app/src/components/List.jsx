import React from 'react';
import Button from '@/components/Button';

import styles from '@/styles/List.module.css';
import buttstyles from '@/styles/Button.module.css';

export default function TodoList({ value, setValue }) {
  return (
    <div>
      <h3>{value.length ? "List of items" : "No Items to Display"}</h3>
      <ListItems value={value} setValue={setValue} />
    </div>
  );
}

function ListItems({ value, setValue }) {
  return (
    <ul className={styles.list}>
      {
        value.map(
          item => item && item.title
            ? <ListItem value={item} setTodoItems={setValue} />
            : null
        )
      }
    </ul>
  );
}

function ListItem({ value, setTodoItems }) {

  const handleToggleTodo = (id, isComplete) => {
    setTodoItems(currentTodos => currentTodos.map(
      item => item && item.id === id
        ? { ...item, complete: isComplete }
        : item
    ));
  }

  const handleTodoDel = (id) => {
    setTodoItems(currentTodos => currentTodos.filter(
      item => item && item.id !== id
    ));
  }

  return (
    <li key={value.id}>
      <label>
        <input
          type="checkbox"
          checked={value.complete}
          onChange={e => handleToggleTodo(value.id, e.target.checked)} />
        {value.title}
      </label>
      <Button
        label="Delete"
        onClick={e => handleTodoDel(value.id)}
        additionalClassesList={[ buttstyles.btnDanger ]} />
    </li>
  );
}
