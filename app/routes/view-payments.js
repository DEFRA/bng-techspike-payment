const config = require('../config')
const moment = require('moment')
const { get } = require('../api')

module.exports = [
  {
    method: 'GET',
    path: '/view-payments',
    options: {
      handler: async (request, h) => {
        const query = new URLSearchParams(request.query)
        const res = await get(`${config.paymentApiUrl}?${query}`, config.paymentApiKey)

        const paymentRes = res.results.map(r => {
          const date = moment(r.created_date).format('DD-MM-YYYY HH:MM')

          return { ...r, date }
        })

        console.log(paymentRes)

        return h.view('view-payments', { results: paymentRes })
      }
    }
  }
]
