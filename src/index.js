import products from './products.json'
import React  from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css'
import { Title } from './components/Title/Title';
import { ProductList } from './components/ProductList/ProductList';
import { Filter } from './components/Filter/Filter';
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
