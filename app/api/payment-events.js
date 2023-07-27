const config = require('../config')
const { get } = require('./base')
const formatDate = require('../lib/format-date')

const paymentEvents = async (id) => {
  let eventsResponse = await get(`${config.paymentApiUrl}/${id}/events`, config.paymentApiKey)
  eventsResponse = formatDate(eventsResponse.events, 'updated')
  return eventsResponse
}

module.exports = paymentEvents
