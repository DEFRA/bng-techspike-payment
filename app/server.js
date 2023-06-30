const config = require('./config')
const Hapi = require('@hapi/hapi')

async function createServer() {
  const server = Hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/view-content'))
  await server.register(require('./plugins/swagger'))

  return server
}

module.exports = createServer
