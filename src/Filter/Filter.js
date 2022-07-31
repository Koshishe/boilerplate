import React, { useEffect, useContext } from 'react';
import styles from './Filter.module.css'
import Discount from '../Discount/Discount';
import { Input } from '../UI/Input/Input';
import { Categories } from '../Categories/Categories';
import { ProductContext } from '../index';
import { connect } from 'react-redux';
import {
  addCategoryAction, addDiscountFilterAction, addMaxPriceFilterAction,
  addMinPriceFilterAction,
  filterProductsAction
} from '../store/actions';

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => {
  return {
    filterProducts: (payload) => dispatch(filterProductsAction(payload)),
    addCategory: (payload) => dispatch(addCategoryAction(payload)),
    addMinPriceFilter: (payload) => dispatch(addMinPriceFilterAction(payload)),
    addMaxPriceFilter: (payload) => dispatch(addMaxPriceFilterAction(payload)),
    addDiscountFilter: (payload) => dispatch(addDiscountFilterAction(payload))
  }
}

export const Filter = connect(mapStateToProps, mapDispatchToProps)((props) => {
  const { products } = useContext(ProductContext)
  const { filters } = props
  const { categories, prices, discount } = filters

  const getPrice = (min) => {
    const prices = products.map((item) => Number(item.price))
    return min ? Math.min(...prices) : Math.max(...prices)
  }

  useEffect(() => {
    const urlCategories = window.location.search.replace('?filter=', '').split(',')
    if (urlCategories[0]) {
      props.addCategory(urlCategories)
    }
  }, [props])

  useEffect(() => {
    props.addMinPriceFilter(getPrice(true))
    props.addMaxPriceFilter(getPrice())
  }, [getPrice, props])

  useEffect(() => {
    props.filterProducts(products.filter((item) => {
      return item.price >= prices.min &&
        item.price <= prices.max &&
        item.discount >= discount &&
        (categories.length ? item.category.filter((item) => categories.indexOf(item) !== -1).length : true)
    }))
  }, [prices.min, prices.max, discount, categories, props, products])

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
              onChange={props.addMinPriceFilter}
              label={'от'}
            />
          </div>
          <div className={styles.formItem}>
            <Input
              name={'to'}
              type={'number'}
              value={prices.max}
              onChange={props.addMaxPriceFilter}
              label={'до'}
            />
          </div>
        </div>
      </form>
      <Discount
        title='Скидка'
        name="discount"
        value={discount}
        onChange={props.addDiscountFilter}
      />
      <Categories />
    </div>
  )
})
