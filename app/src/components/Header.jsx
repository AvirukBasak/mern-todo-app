import React from 'react';
import styles from '@/styles/Header.module.css';

export default function Header({ title }) {
  return (
    <>
      <header className={styles.header}>
        {title}
      </header>
    </>
  );
}
