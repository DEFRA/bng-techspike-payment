const joi = require('joi')
const config = require('../config')
const { post } = require('../api')
const schema = require('./schemas/createPayment')

module.exports = [
  {
    method: 'GET',
    path: '/create-payment',
    options: {
      handler: async (request, h) => {
        return h.view('create-payment')
      }
    }
  },
  {
    method: 'POST',
    path: '/create-payment',
    options: {
      validate: {
        payload: joi.object().concat(schema),
        failAction: async (request, h, err) => {
          console.log(err)
          return h.response('Error').code(500)
        }
      },
      handler: async (request, h) => {
        const payload = request.payload

        const payment = {
          amount: payload.amount,
          reference: payload.reference,
          description: payload.description,
          prefilled_cardholder_details: {
            cardholder_name: payload.cardholder_name
          },
          email: payload.email,
          return_url: 'http://localhost:3000',
          language: 'en'
        }

        const res = await post(config.paymentApiUrl, payment, config.paymentApiKey)

        console.log(res)

        return h.redirect(res._links.next_url.href, 301)
      }
    }
  }
]
