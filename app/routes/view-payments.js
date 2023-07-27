const { viewPayments } = require('../api')

module.exports = [
  {
    method: 'GET',
    path: '/view-payments',
    options: {
      handler: async (request, h) => {
        const query = new URLSearchParams(request.query)
        const paymentResults = await viewPayments(query)
        return h.view('view-payments', paymentResults)
      }
    }
  }
]
