const moment = require('moment')

const formatDate = (arr, dateField) => {
  return arr.map(r => {
    const date = moment(r[dateField]).format('DD-MM-YYYY hh:mm:ss')

    return { ...r, date }
  })
}

module.exports = formatDate
