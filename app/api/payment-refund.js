const config = require('../config')
const { get, post } = require('./base')
const formatDate = require('../lib/format-date')

const viewPaymentRefunds = async (id) => {
  let refundResponse = await get(`${config.paymentApiUrl}/${id}/refunds`, config.paymentApiKey)
  refundResponse = formatDate(refundResponse._embedded.refunds, 'created_date')
  return refundResponse
}

const refundPayment = async (id, refundAmount, refundAvailable) => {
  const payload = {
    amount: parseInt(refundAmount),
    refund_amount_available: parseInt(refundAvailable)
  }

  return post(`${config.refundApiUrl}/${id}/refunds`, payload, config.paymentApiKey)
}

module.exports = {
  refundPayment,
  viewPaymentRefunds
}
