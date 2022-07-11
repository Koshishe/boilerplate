import React from 'react';
import pt from 'prop-types';
import styles from './Discount.module.css';

const Discount = ({ title, name, value, onChange }) => {
  return (
    <React.Fragment>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper}>
        от <input
        className={styles.discountValue}
        name={name}
        value={value}
        onChange={onChange} />%
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
