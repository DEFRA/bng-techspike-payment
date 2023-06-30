module.exports = [
  {
    method: 'GET',
    path: '/assets/{path*}',
    options: {
      handler: {
        directory: {
          path: [
            'node_modules/govuk-frontend/govuk/assets'
          ]
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/static/{path*}',
    options: {
      handler: {
        directory: {
          path: [
            'app/dist',
            'node_modules/govuk-frontend/govuk/assets'
          ]
        }
      }
    }
  }
]
