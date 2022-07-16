import React from 'react';
import pt from 'prop-types';
import styles from './Discount.module.css';
import { Input } from '../UI/Input/Input';

const Discount = ({ title, name, value, onChange }) => {
  return (
    <React.Fragment>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper}>
        <Input
          name={name}
          type={'number'}
          value={value}
          onChange={onChange}
          label={'от'}
          extText={'%'}
        />
      </div>
    </React.Fragment>
  );
};

Discount.propTypes = {
  value: pt.number.isRequired,
  onChange: pt.func.isRequired,
  name: pt.string.isRequired,
  title: pt.string.isRequired
};

export default Discount
