const config = require('../config')
const { post } = require('./base')

const refundPayment = async (id, refundAmount, refundAvailable) => {
  const payload = {
    amount: parseInt(refundAmount),
    refund_amount_available: parseInt(refundAvailable)
  }

  return post(`${config.paymentApiUrl}/${id}/refunds`, payload, config.paymentApiKey)
}

module.exports = refundPayment
