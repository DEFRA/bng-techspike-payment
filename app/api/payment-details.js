const config = require('../config')
const moment = require('moment')
const { get } = require('./base')
const { viewPaymentRefunds } = require('./payment-refund')
const paymentEvents = require('./payment-events')

const fullPaymentDetails = async (id) => {
  const paymentResponse = await get(`${config.paymentApiUrl}/${id}`, config.paymentApiKey)
  paymentResponse.date = moment(paymentResponse.created_date).format('DD-MM-YYYY hh:mm:ss')

  const refundResponse = await viewPaymentRefunds(id)
  const eventsResponse = await paymentEvents(id)

  return { payment: paymentResponse, events: eventsResponse, refunds: refundResponse }
}

const paymentDetails = async (id) => {
  return get(`${config.paymentApiUrl}/${id}`, config.paymentApiKey)
}

module.exports = {
  paymentDetails,
  fullPaymentDetails
}
