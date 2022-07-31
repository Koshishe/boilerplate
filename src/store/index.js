import { createStore, combineReducers } from 'redux'
import { filtersReducer, productsReducer } from './reducers';
import products from '../products.json'

export const initialState = {
  productsFiltered: products,
  filters: {
    categories: [],
    prices: {
      min: 0,
      max: 0,
    },
    discount: 0
  }
}

const reducer = combineReducers({
  productsFiltered: productsReducer,
  filters: filtersReducer
})

export const store = createStore(reducer, initialState)
