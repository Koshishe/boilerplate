import products from './products.json'
import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import { Title } from './Title/Title';
import { ProductList } from './ProductList/ProductList';

function App() {
  return (
    <div className="App">
      <Title title="Список товаров" />
      <ProductList products={products} />
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
