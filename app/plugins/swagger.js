const { serviceName } = require('../config')

module.exports = {
    plugin: require('hapi-swagger'),
    options: {
        info: {
            title: `${serviceName} API Documentation`,
            version: '1.0'
        }
    }
}