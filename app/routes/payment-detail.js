const { fullPaymentDetails, cancelPayment } = require('../api')

module.exports = [
  {
    method: 'GET',
    path: '/payment-detail/{id}',
    options: {
      handler: async (request, h) => {
        const paymentDetailData = await fullPaymentDetails(request.params.id)
        return h.view('payment-detail', paymentDetailData)
      }
    }
  },
  {
    method: 'POST',
    path: '/payment-detail/cancel/{id}',
    options: {
      handler: async (request, h) => {
        await cancelPayment(request.params.id)
        return h.redirect('/view-payments')
      }
    }
  }
]
