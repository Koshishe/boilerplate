import React from 'react';
import styles from './Input.module.css'
import pt from 'prop-types';

export function Input({name, type, value, onChange, label, extText}) {
  return (
    <>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        type={type}
        id={name}
        className={styles.field}
        value={value}
        onChange={onChange}
      />
      {extText && <span className={styles.text}>{extText}</span>}
    </>
  )
}

Input.propTypes = {
  name: pt.string.isRequired,
  type: pt.string.isRequired,
  value: pt.number.isRequired,
  onChange: pt.func.isRequired,
  label: pt.string.isRequired,
  extText: pt.string,
}
