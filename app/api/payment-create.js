const { post } = require('./base')
const config = require('../config')

const createPayment = async (payload) => {
  const payment = {
    amount: payload.amount,
    reference: payload.reference,
    description: payload.description,
    prefilled_cardholder_details: {
      cardholder_name: payload.cardholder_name
    },
    email: payload.email,
    return_url: 'http://localhost:3000/payment-return',
    language: 'en'
  }

  return post(config.paymentApiUrl, payment, config.paymentApiKey)
}

module.exports = createPayment
