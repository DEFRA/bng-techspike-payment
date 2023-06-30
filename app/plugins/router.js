const { server } = require('@hapi/hapi')

const routes = [].concat(
    require('../routes/index'),
    require('../routes/create-payment'),
    require('../routes/view-payments'),
    require('../routes/payment-detail'),
    require('../routes/static'),
    require('../routes/payment')
)

module.exports = {
    plugin: {
        name: 'router',
        register: (server, _) => {
            server.route(routes)
        }
    }
}
