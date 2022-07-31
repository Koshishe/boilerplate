import products from './products.json'
import React  from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css'
import { Title } from './Title/Title';
import { ProductList } from './ProductList/ProductList';
import { Filter } from './Filter/Filter';
import { Provider } from 'react-redux';
import { store } from './store';

export const ProductContext = React.createContext()

function App() {
  return (
    <ProductContext.Provider value={{products: products}}>
      <div className={styles.wrapper}>
        <Title title="Список товаров" />
        <div className={styles.content}>
          <Filter />
          <ProductList />
        </div>
      </div>
    </ProductContext.Provider>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
