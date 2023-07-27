const session = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: async (request, h) => {
        return h.view('index')
      }
    }
  }
]
