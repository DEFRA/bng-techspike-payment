const { paymentDetails } = require('../api')
const session = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/payment-failed',
    options: {
      handler: async (request, h) => {
        const paymentId = session.getPaymentReference(request, 'payment_id')
        const payment = await paymentDetails(paymentId)

        return h.view('payment-failed', { message: payment.state.message })
      }
    }
  }
]
