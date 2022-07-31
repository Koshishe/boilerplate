import { createStore, combineReducers } from 'redux'
import { filtersReducer, productsReducer } from './reducers';

const initialState = {
  products: [],
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
  products: productsReducer,
  filters: filtersReducer
})

export const store = createStore(reducer, initialState)
