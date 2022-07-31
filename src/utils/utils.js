export const  updateURL = (filter) => {
  if (window.history.pushState) {
    const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    const newUrl = `${baseUrl}${filter && `?filter=${filter}`}`
    window.history.pushState(null, null, newUrl)
  }
  else {
    console.warn('History API не поддерживается')
  }
}

export const parsePrice = (price) => {
  const priceStr = String(price)
  if (priceStr.length > 3) {
    return `${priceStr.slice(0, priceStr.length - 3)} ${priceStr.slice(priceStr.length - 3, priceStr.length)} ₽`
  } else {
    return `${price} ₽`
  }
}
