export function productsReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_PRODUCTS': {
      return {
        ...state,
        products: action.payload,
      }
    }
  }
  return state
}

export function filtersReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: action.payload
        }
      }
    }
    case 'ADD_PRICE_FILTER': {
      return {
        ...state,
        filters: {
          ...state.filters,
          prices: action.payload
        }
      }
    }
    case 'ADD_DISCOUNT_FILTER': {
      return {
        ...state,
        filters: {
          ...state.filters,
          discount: action.payload
        }
      }
    }
  }
  return state
}
