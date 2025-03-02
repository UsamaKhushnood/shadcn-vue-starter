export const formatDatetime = (date) => {
  return new Date(date).toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getIndex = (array, id, key = 'id') => {
  return array.findIndex((item) => item[key] === id)
}

export const formatPrice = (value, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  })

  return formatter.format(value)
}
