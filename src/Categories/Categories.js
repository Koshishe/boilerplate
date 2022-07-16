import React from 'react'
import pt from 'prop-types';
import styles from './Categories.module.css'
import { CategoryCheckbox } from './CategoryCheckbox';

export function Categories({ items, toggleCategory, activeCategories }) {

  return (
    <div className={styles.categories}>
      <div className={styles.title}>Категории</div>
      <div className={styles.list}>
        {items.map((category) => (
          <CategoryCheckbox
            key={category}
            category={category}
            toggleCategory={toggleCategory}
            className={activeCategories.indexOf(category) !== -1 && styles.isActve}
          />
        ))}
      </div>
    </div>
  )
}

Categories.propTypes = {
  items: pt.array.isRequired,
  activeCategories: pt.array.isRequired,
  toggleCategory: pt.func.isRequired,
};
