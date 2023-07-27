const api = require('../api')
const session = require('../session')
const config = require('../config')
const { FAILED, CANCELLED, ERROR } = require('../constants/payment-status')

module.exports = [
  {
    method: 'GET',
    path: '/payment-return',
    options: {
      handler: async (request, h) => {
        const paymentId = session.getPaymentReference(request, 'payment_id')
        const payment = await api.get(`${config.paymentApiUrl}/${paymentId}`, config.paymentApiKey)

        console.log(payment)

        const status = payment.state.status

        if (status === FAILED || status === CANCELLED || status === ERROR) {
          return h.response(payment.state.message).code(400)
        }

        return h.view('payment-successful')
      }
    }
  }
]
