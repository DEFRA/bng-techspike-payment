const joi = require('joi')

const schema = joi.object({
    port: joi.number().default(3000),
    paymentApiUrl: joi.string().default('https://publicapi.payments.service.gov.uk/v1/payments'),
    paymentApiKey: joi.string().required(),
    isDev: joi.bool().default(false),
    serviceName: joi.string()
})

const config = {
    port: process.env.PORT,
    paymentApiUrl: process.env.PAYMENT_API_URL,
    paymentApiKey: process.env.PAYMENT_API_KEY,
    isDev: process.env.NODE_ENV === 'production',
    serviceName: "BNG Payment Spike"
}

const { err, value } = schema.validate(config, {
    abortEarly: false
})

if (err) {
    throw new Error(`Config is invalid: ${err.message}`)
}

module.exports = value
