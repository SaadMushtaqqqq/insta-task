import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type, placeholder, value, onChange, name }) => {
  return (
    <div className={styles.container}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        required
      />
    </div>
  );
};

export default InputField;