const joi = require('joi')
const config = require('../config')
const { get, post } = require('../api')
const schema = require('./schemas/createPayment')

module.exports = [
  {
    method: 'GET',
    path: '/payment/complete',
    options: {
      handler: async (request, h) => {
        return h.response('Payment complete').code(200)
      }
    }
  },
  {
    method: 'GET',
    path: '/payment/{id}',
    options: {
      handler: async (request, h) => {
        const res = await get(`${config.paymentApiUrl}/${request.params.id}`, config.paymentApiKey)
        console.log(res)
        return h.response(res).code(200)
      },
      description: 'Get payment by id',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/payment/{id}/events',
    options: {
      handler: async (request, h) => {
        const res = await get(`${config.paymentApiUrl}/${request.params.id}/events`, config.paymentApiKey)
        return h.response(res).code(200)
      }
    }
  },
  {
    method: 'GET',
    path: '/payments',
    options: {
      handler: async (request, h) => {
        const query = new URLSearchParams(request.query)
        const res = await get(`${config.paymentApiUrl}?${query}`, config.paymentApiKey)
        return h.response(res).code(200)
      },
      description: 'Get payments using optional filters',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/payment/create',
    options: {
      validate: {
        payload: joi.object().concat(schema),
        failAction: async (request, h, err) => {
          return h.response('Error').code(500)
        }
      },
      handler: async (request, h) => {
        const payload = request.payload
        const res = await post(config.paymentApiUrl, payload, config.paymentApiKey)
        return h.response(res).code(200)
      }
    }
  },
  {
    method: 'POST',
    path: '/payment/cancel/{id}',
    options: {
      validate: {
        payload: joi.object().concat(schema),
        failAction: async (request, h, err) => {
          return h.response('Error').code(500)
        }
      },
      handler: async (request, h) => {
        const res = await post(`${config.paymentApiUrl}/${request.params.id}/cancel`, {}, config.paymentApiKey)
        return h.response(res).code(200)
      }
    }
  }
]
