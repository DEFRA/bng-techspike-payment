const config = require('../config')
const { get } = require('./base')
const moment = require('moment')

const viewPayments = async (query) => {
  const res = await get(`${config.paymentApiUrl}?${query}`, config.paymentApiKey)

  const paymentRes = res.results.map(r => {
    const date = moment(r.created_date).format('DD-MM-YYYY hh:mm:ss')

    return { ...r, date }
  })

  return { results: paymentRes }
}

module.exports = viewPayments
