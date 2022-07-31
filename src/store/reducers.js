export function productsReducer(state = [], action) {
  switch (action.type) {
    case 'FILTER_PRODUCTS': {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export function filtersReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      return {
        ...state,
        categories: action.payload
      }
    }
    case 'ADD_MIN_PRICE_FILTER': {
      return {
        ...state,
        prices: {
          ...state.prices,
          min: action.payload
        }
      }
    }
    case 'ADD_MAX_PRICE_FILTER': {
      return {
        ...state,
        prices: {
          ...state.prices,
          max: action.payload
        }
      }
    }
    case 'ADD_DISCOUNT_FILTER': {
      return {
        ...state,
        discount: action.payload
      }
    }
    default: {
      return state
    }
  }
}
