const fs = require('fs')
const path = require('path')

const readData = () => {
  const rawdata = fs.readFileSync(path.join(__dirname, './Landowner-Registration-JSON-Payload.json'))
  return JSON.parse(rawdata)
}

module.exports = readData
