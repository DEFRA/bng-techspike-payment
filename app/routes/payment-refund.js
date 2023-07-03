const config = require('../config')
const { post } = require('../api')

module.exports = [
  {
    method: 'POST',
    path: '/payment-refund/{id}',
    options: {
      handler: async (request, h) => {
        const referrer = request.info.referrer

        const payload = {
          amount: parseInt(request.payload.refund_amount),
          refund_amount_available: parseInt(request.payload.refund_available)
        }

        const res = await post(`${config.paymentApiUrl}/${request.params.id}/refunds`, payload, config.paymentApiKey)
        console.log(res)
        return h.redirect(referrer)
      }
    }
  }
]
