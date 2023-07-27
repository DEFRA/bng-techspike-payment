const config = require('../config')
const { post } = require('./base')

const cancelPayment = async (id) => {
  return post(`${config.paymentApiUrl}/${id}/cancel`, {}, config.paymentApiKey)
}

module.exports = cancelPayment
