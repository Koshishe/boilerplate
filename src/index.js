import products from './products.json'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css'
import { Title } from './Title/Title';
import { ProductList } from './ProductList/ProductList';
import { Filter } from './Filter/Filter';
import { uniq } from 'lodash'

function App() {
  const [productsList, setProductsList] = useState(products)

  const getPrice = (min) => {
    const prices = products.map((item) => Number(item.price))
    return min ? Math.min(...prices) : Math.max(...prices)
  }

  const getCategories = () => {
    return uniq(products.map((item) => item.category).flat())
  }

  const filterProducts = (minPrice, maxPrice, discount, activeCategories) => {
    setProductsList(products.filter((item) => {
      return item.price >= minPrice &&
        item.price <= maxPrice &&
        item.discount >= discount &&
        (activeCategories.length ? item.category.filter((item) => activeCategories.indexOf(item)  !== -1).length : true)
    }))
  }

  return (
    <div className={styles.wrapper}>
      <Title title="Список товаров" />
      <div className={styles.content}>
        <Filter getPrice={getPrice} filterProducts={filterProducts} getCategories={getCategories} />
        <ProductList products={productsList} />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
