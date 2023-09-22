import React from 'react';
import styles from '@/styles/Button.module.css';

export default function Button({ disabled = false, onClick, disabledHint = 'Disabled', label = 'Submit' , additionalClassesList = [] }) {
  return (
    <>
      <button
        className={[ styles.btn, ...additionalClassesList ].join(' ')}
        disabled={disabled}
        onClick={e => onClick(e)}>
        {disabled ? disabledHint : label}
      </button>
    </>
  );
}
