const joi = require('joi')
const config = require('../config')
const { get } = require('../api')

module.exports = [
    {
      method: 'GET',
      path: '/payment-detail/{id}',
      options: {
        handler: async (request, h) => {
            const res = await get(`${config.paymentApiUrl}/${request.params.id}`, config.paymentApiKey)
            return h.view('payment-detail', res)
        },
      }
    }
]
  