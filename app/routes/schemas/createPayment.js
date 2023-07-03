const joi = require('joi')

module.exports = joi.object({
  amount: joi.number().required(),
  reference: joi.string().required(),
  description: joi.string().required(),
  cardholder_name: joi.string().required(),
  email: joi.string().required()
})
