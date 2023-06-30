const config = require('../config')
const { get, post } = require('../api')

module.exports = [
  {
    method: 'GET',
    path: '/payment-detail/{id}',
    options: {
      handler: async (request, h) => {
        const paymentResponse = await get(`${config.paymentApiUrl}/${request.params.id}`, config.paymentApiKey)
        const eventsResponse = await get(`${config.paymentApiUrl}/${request.params.id}/events`, config.paymentApiKey)
        return h.view('payment-detail', { payment: paymentResponse, events: eventsResponse.events })
      }
    }
  },
  {
    method: 'POST',
    path: '/payment-detail/cancel/{id}',
    options: {
      handler: async (request, h) => {
        await post(`${config.paymentApiUrl}/${request.params.id}/cancel`, {}, config.paymentApiKey)
        return h.redirect('/view-payments')
      }
    }
  }
]
