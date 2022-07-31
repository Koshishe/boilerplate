import React from 'react'
import cx from 'classnames';
import styles from './Categories.module.css';
import pt from 'prop-types';

export function CategoryCheckbox({category, className, toggleCategory}) {
  return (
    <label key={category} className={cx(styles.categoryLabel, className)}>
    {category}
    <input
      type="checkbox"
      className={styles.categoryCheck}
      onChange={() => toggleCategory(category)}
    />
  </label>
  )
}

CategoryCheckbox.propTypes = {
  category: pt.string.isRequired,
  className: pt.string,
  toggleCategory: pt.func.isRequired,
}
