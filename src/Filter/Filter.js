import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css'
import Discount from '../Discount/Discount';
import { Input } from '../UI/Input/Input';
import { Categories } from '../Categories/Categories';
import pt from 'prop-types';

export function Filter({getPrice, filterProducts, getCategories}) {
  const [minValue, setMinValue] = useState(getPrice(true))
  const [maxValue, setMaxValue] = useState(getPrice(false))
  const [discount, setDiscount] = useState(0)
  const [activeCategories, setActiveCategories] = useState([])

  const toggleCategory = (category) => {
    if (activeCategories.indexOf(category) !== -1) {
      const newCategories = activeCategories.filter((item) => item !== category)
      setActiveCategories(newCategories)
      updateURL(newCategories.length ? newCategories.join(',') : '')
    } else {
      const newCategories = [...activeCategories, category]
      setActiveCategories([...activeCategories, category])
      updateURL(`${newCategories.join(',')}`)
    }
  }

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

  useEffect(() => {
    const urlCategories = window.location.search.replace('?filter=', '').split(',')
    if (urlCategories[0]) {
      setActiveCategories(urlCategories)
    }
  }, [])

  useEffect(() => {
    filterProducts(minValue, maxValue, discount, activeCategories)
  }, [minValue, maxValue, discount, activeCategories, filterProducts])

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.title}>Цена</div>
      <form className={styles.form}>
        <div className={styles.formWrapper}>
          <div className={styles.formItem}>
            <Input
              name={'from'}
              type={'number'}
              value={minValue}
              onChange={setMinValue}
              label={'от'}
            />
          </div>
          <div className={styles.formItem}>
            <Input
              name={'to'}
              type={'number'}
              value={maxValue}
              onChange={setMaxValue}
              label={'до'}
            />
          </div>
        </div>
      </form>
      <Discount
        title='Скидка'
        name="discount"
        value={discount}
        onChange={setDiscount}
      />
      <Categories items={getCategories()} activeCategories={activeCategories} toggleCategory={toggleCategory} />
    </div>
  )
}

Filter.propTypes = {
  filterProducts: pt.number,
  getPrice: pt.func,
  getCategories: pt.func,
};
