import React, { useContext } from 'react';
import styles from './Categories.module.css'
import { CategoryCheckbox } from './CategoryCheckbox';
import { addCategoryAction } from '../store/actions';
import { connect } from 'react-redux';
import { uniq } from 'lodash';
import { ProductContext } from '../index';

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => {
  return {
    addCategory: (payload) => dispatch(addCategoryAction(payload)),
  }
}

export const Categories = connect(mapStateToProps, mapDispatchToProps)((props) =>  {
  const { products } = useContext(ProductContext)
  const { filters } = props
  const { categories } = filters

  const allCategories = uniq(products.map((item) => item.category).flat())

  const  updateURL = (filter) => {
    if (window.history.pushState) {
      const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
      const newUrl = `${baseUrl}${filter && `?filter=${filter}`}`
      window.history.pushState(null, null, newUrl)
    }
    else {
      console.warn('History API не поддерживается')
    }
  }

  const toggleCategory = (category) => {
    if (categories.indexOf(category) !== -1) {
      const newCategories = categories.filter((item) => item !== category)
      props.addCategory(newCategories)
      updateURL(newCategories.length ? newCategories.join(',') : '')
    } else {
      const newCategories = [...categories, category]
      props.addCategory([...categories, category])
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
})
