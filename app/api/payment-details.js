const config = require('../config')
const moment = require('moment')
const { get } = require('./base')

const fullPaymentDetails = async (id) => {
  const paymentResponse = await get(`${config.paymentApiUrl}/${id}`, config.paymentApiKey)
  let refundResponse = await get(`${config.paymentApiUrl}/${id}/refunds`, config.paymentApiKey)
  let eventsResponse = await get(`${config.paymentApiUrl}/${id}/events`, config.paymentApiKey)

  paymentResponse.date = moment(paymentResponse.created_date).format('DD-MM-YYYY hh:mm:ss')

  refundResponse = refundResponse._embedded.refunds.map(r => {
    const date = moment(r.created_date).format('DD-MM-YYYY hh:mm:ss')

    return { ...r, date }
  })

  eventsResponse = eventsResponse.events.map(r => {
    const date = moment(r.updated).format('DD-MM-YYYY hh:mm:ss')

    return { ...r, date }
  })

  return { payment: paymentResponse, events: eventsResponse, refunds: refundResponse }
}

const paymentDetails = async (id) => {
  return get(`${config.paymentApiUrl}/${id}`, config.paymentApiKey)
}

module.exports = {
  paymentDetails,
  fullPaymentDetails
}
