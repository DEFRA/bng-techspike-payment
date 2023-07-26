const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const setPaymentReference = (request, key, value) => {
  set(request, 'payment', key, value)
}

const getPaymentReference = (request, key) => {
  return get(request, 'payment', key)
}

module.exports = {
  getPaymentReference,
  setPaymentReference
}
