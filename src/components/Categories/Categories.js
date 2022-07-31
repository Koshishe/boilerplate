import React, { useContext } from 'react';
import styles from './Categories.module.css'
import { CategoryCheckbox } from './CategoryCheckbox';
import { addCategoryAction } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { uniq } from 'lodash';
import { ProductContext } from '../../index';
import { updateURL } from '../../utils/utils';
import { categoriesSelector } from '../../store/selectors';

export const Categories = () =>  {
  const dispatch = useDispatch()
  const { products } = useContext(ProductContext)
  const categories = useSelector(categoriesSelector)

  const allCategories = uniq(products.map((item) => item.category).flat())

  const toggleCategory = (category) => {
    if (categories.indexOf(category) !== -1) {
      const newCategories = categories.filter((item) => item !== category)
      dispatch(addCategoryAction(newCategories))
      updateURL(newCategories.length ? newCategories.join(',') : '')
    } else {
      const newCategories = [...categories, category]
      dispatch(addCategoryAction([...categories, category]))
      updateURL(`${newCategories.join(',')}`)
    }
  }

  return (
    <div className={styles.categories}>
      <div className={styles.title}>Категории</div>
      <div className={styles.list}>
        {allCategories.map((category) => (
          <CategoryCheckbox
            key={category}
            category={category}
            toggleCategory={toggleCategory}
            className={categories.indexOf(category) !== -1 ? styles.isActve : ''}
          />
        ))}
      </div>
    </div>
  )
}
