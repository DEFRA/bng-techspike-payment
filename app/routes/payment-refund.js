const { refundPayment } = require('../api')

module.exports = [
  {
    method: 'POST',
    path: '/payment-refund/{id}',
    options: {
      handler: async (request, h) => {
        const referrer = request.info.referrer
        const paymentId = request.params.id
        const refundAmount = request.payload.refund_amount
        const refundAvailable = request.payload.refund_available
        await refundPayment(paymentId, refundAmount, refundAvailable)

        return h.redirect(referrer)
      }
    }
  }
]
