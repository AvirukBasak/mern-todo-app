import React from 'react';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import TodoList from '@/components/List';

import { uuidv4 } from '@/scripts/script';
import styles from '@/styles/Form.module.css';

export default function Form() {

  const [newItem, setNewItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const [inputDisabled, setInputDisabled] = useState(true);

  /* create a session key if not exists on app start */
  useEffect(() => {
    if (!localStorage.getItem('user-uuid'))
      localStorage.setItem('user-uuid', uuidv4());
    console.log(`user uuid is ${localStorage.getItem('user-uuid')}`);
  }, []);

  /* load list from server on first render */
  useEffect(() => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'READ',
        uuid: localStorage.getItem('user-uuid'),
        timestamp: (new Date()).toLocaleString(),
      })
    }).then(async data => {
      const resBody = await data.json();
      setTodoItems(currentItems => {
        setInputDisabled(false);
        return resBody?.data?.todoList || currentItems;
      });
    }).catch(e => {
      console.error(e);
      throw e;
    })
  }, []);

  /* upload data to db on todoItems change
     called 2wice on start:
     1ce on init and 1ce on todoItems changed after READ in ListItems */
  useEffect(() => {
    /* upload only if array not empty */
    !inputDisabled && fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'UPDATE',
        uuid: localStorage.getItem('user-uuid'),
        timestamp: (new Date()).toLocaleString(),
        todoList: todoItems,
      })
    }).catch(e => {
      console.error(e);
      throw e;
    });
  }, [todoItems]);

  const handleSubmit = function () {
    newItem &&  setTodoItems(currentTodos => {
      const result = [
        ...currentTodos, {
          id: uuidv4(),
          title: newItem,
          complete: false,
        }
      ];
      setNewItem('');
      return result;
    });
  }

  return (
    <form onSubmit={e => e.preventDefault()} className={styles.newItemForm}>
      <h1>Todo List</h1>
      <div className={styles.formRow}>
        <label htmlFor="item">New Item</label>
        <input
          id="item"
          type="text"
          value={newItem}
          disabled={inputDisabled}
          placeholder={inputDisabled ? 'Loading Server Data...' : 'Enter new todo item'}
          onChange={e => { setNewItem(e.target.value); }} />
      </div>
      <Button
        disabled={inputDisabled}
        onClick={handleSubmit}
        disabledHint="Loading Server Data..."
        label="Add Item" />
      <TodoList value={todoItems} setValue={setTodoItems} />
    </form>
  )
}
