import products from './products.json'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css'
import { Title } from './Title/Title';
import { ProductList } from './ProductList/ProductList';
import { Filter } from './Filter/Filter';

function App() {
  const [productsList, setProductsList] = useState(products)

  const getPrice = (min) => {
    const prices = products.map((item) => Number(item.price))
    return min ? Math.min(...prices) : Math.max(...prices)
  }

  const filterProducts = (minPrice, maxPrice, discount) => {
    setProductsList(products.filter((item) => {
      return item.price >= minPrice && item.price <= maxPrice && item.discount >= discount
    }))
  }

  return (
    <div className={styles.wrapper}>
      <Title title="Список товаров" />
      <Filter getPrice={getPrice} filterProducts={filterProducts} />
      <ProductList products={productsList} />
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
