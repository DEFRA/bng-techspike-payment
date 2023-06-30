const config = require('../config')
const { get } = require('../api')

module.exports = [
  {
    method: 'GET',
    path: '/view-payments',
    options: {
      handler: async (request, h) => {
        const query = new URLSearchParams(request.query)
        const res = await get(`${config.paymentApiUrl}?${query}`, config.paymentApiKey)
        return h.view('view-payments', res)
      }
    }
  }
]
