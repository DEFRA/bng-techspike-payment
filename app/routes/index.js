const session = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: async (request, h) => {
        session.setPaymentReference(request, 'paymentReference', '12345')
        console.log(session.getPaymentReference(request, 'paymentReference'))
        return h.view('index')
      }
    }
  }
]
