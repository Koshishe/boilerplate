import React, { useEffect, useContext } from 'react';
import styles from './Filter.module.css'
import Discount from '../Discount/Discount';
import { Input } from '../../UI/Input/Input';
import { Categories } from '../Categories/Categories';
import { ProductContext } from '../../index';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCategoryAction,
  addDiscountFilterAction,
  addMaxPriceFilterAction,
  addMinPriceFilterAction,
  filterProductsAction
} from '../../store/actions';
import {
  categoriesSelector,
  discountSelector,
  pricesSelector
} from '../../store/selectors';

export const Filter = () => {
  const { products } = useContext(ProductContext)
  const dispatch = useDispatch()

  const categories = useSelector(categoriesSelector)
  const prices = useSelector(pricesSelector)
  const discount = useSelector(discountSelector)

  const minPrice = Math.min(...products.map((item) => Number(item.price)))
  const maxPrice = Math.max(...products.map((item) => Number(item.price)))

  useEffect(() => {
    const urlCategories = window.location.search.replace('?filter=', '').split(',')
    if (urlCategories[0]) {
      dispatch(addCategoryAction(urlCategories))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(addMinPriceFilterAction(minPrice))
    dispatch(addMaxPriceFilterAction(maxPrice))
  }, [dispatch, maxPrice, minPrice])

  useEffect(() => {
    dispatch(filterProductsAction(products.filter((item) => {
      return item.price >= prices.min &&
        item.price <= prices.max &&
        item.discount >= discount &&
        (categories.length ? item.category.filter((item) => categories.indexOf(item) !== -1).length : true)
    })))
  }, [prices.min, prices.max, discount, categories, products, dispatch])

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.title}>Цена</div>
      <form className={styles.form}>
        <div className={styles.formWrapper}>
          <div className={styles.formItem}>
            <Input
              name={'from'}
              type={'number'}
              value={prices.min}
              onChange={(e) => dispatch(addMinPriceFilterAction(e.target.value))}
              label={'от'}
            />
          </div>
          <div className={styles.formItem}>
            <Input
              name={'to'}
              type={'number'}
              value={prices.max}
              onChange={(e) => dispatch(addMaxPriceFilterAction(e.target.value))}
              label={'до'}
            />
          </div>
        </div>
      </form>
      <Discount
        title='Скидка'
        name="discount"
        value={discount}
        onChange={(e) => dispatch(addDiscountFilterAction(e.target.value))}
      />
      <Categories />
    </div>
  )
}
