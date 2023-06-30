const config = require('../config')
const moment = require('moment')
const { get, post } = require('../api')

module.exports = [
  {
    method: 'GET',
    path: '/payment-detail/{id}',
    options: {
      handler: async (request, h) => {
        const paymentResponse = await get(`${config.paymentApiUrl}/${request.params.id}`, config.paymentApiKey)
        let refundResponse = await get(`${config.paymentApiUrl}/${request.params.id}/refunds`, config.paymentApiKey)
        let eventsResponse = await get(`${config.paymentApiUrl}/${request.params.id}/events`, config.paymentApiKey)
        
        paymentResponse.date = moment(paymentResponse.created_date).format('DD-MM-YYYY HH:MM')

        refundResponse = refundResponse._embedded.refunds.map(r => {
          const date = moment(r.created_date).format('DD-MM-YYYY HH:MM:SS')

          return { ...r, date }
        })

        eventsResponse = eventsResponse.events.map(r => {
            const date = moment(r.updated).format('DD-MM-YYYY HH:MM:SS')

            return { ...r, date }
        })
            
        return h.view('payment-detail', { payment: paymentResponse, events: eventsResponse, refunds: refundResponse })
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
