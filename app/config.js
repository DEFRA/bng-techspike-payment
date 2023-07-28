const joi = require('joi')

const schema = joi.object({
  port: joi.number().default(3000),
  paymentApiUrl: joi.string().default('https://publicapi.payments.service.gov.uk/v1/payments'),
  refundApiUrl: joi.string().default('https://publicapi.payments.service.gov.uk/v1/refunds'),
  paymentApiKey: joi.string().required(),
  isDev: joi.bool().default(false),
  serviceName: joi.string(),
  cache: {
    expiresIn: joi.number().default(1000 * 3600 * 24 * 3), // 3 days
    options: {
      host: joi.string().default('redis-hostname.default'),
      partition: joi.string().default('bng-techspike-payment-frontend'),
      password: joi.string().allow(''),
      port: joi.number().default(6379),
      tls: joi.object()
    }
  },
  cookie: {
    cookieNameSession: joi.string().default('bng_techspike_payment_session'),
    isSameSite: joi.string().default('Lax'),
    isSecure: joi.boolean().default(true),
    password: joi.string().min(32).required(),
    ttl: joi.number().default(1000 * 3600 * 24 * 3) // 3 days
  }
})

const config = {
  port: process.env.PORT,
  paymentApiUrl: process.env.PAYMENT_API_URL,
  refundApiUrl: process.env.REFUND_API_URL,
  paymentApiKey: process.env.PAYMENT_API_KEY,
  isDev: process.env.NODE_ENV === 'production',
  serviceName: 'BNG Payment Spike',
  cache: {
    options: {
      host: process.env.REDIS_HOSTNAME,
      password: process.env.REDIS_PASSWORD,
      port: process.env.REDIS_PORT,
      tls: process.env.NODE_ENV === 'production' ? {} : undefined
    }
  },
  cookie: {
    cookieNameSession: 'bng_techspike_payment_session',
    isSameSite: 'Lax',
    isSecure: process.env.NODE_ENV === 'production',
    password: process.env.COOKIE_PASSWORD
  }
}

const { error, value } = schema.validate(config, {
  abortEarly: false
})

if (error) {
  throw new Error(`Config is invalid: ${error.message}`)
}

module.exports = value
