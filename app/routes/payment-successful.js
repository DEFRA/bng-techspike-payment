module.exports = [
  {
    method: 'GET',
    path: '/payment-successful',
    options: {
      handler: async (request, h) => {
        return h.view('payment-successful')
      }
    }
  }
]
