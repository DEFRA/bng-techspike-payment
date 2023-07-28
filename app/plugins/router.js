const routes = [].concat(
  require('../routes/index'),
  require('../routes/create-payment'),
  require('../routes/view-payments'),
  require('../routes/payment-detail'),
  require('../routes/payment-refund'),
  require('../routes/payment-return'),
  require('../routes/payment-successful'),
  require('../routes/payment-failed'),
  require('../routes/static')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
