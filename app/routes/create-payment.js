const joi = require('joi')
const { createPayment } = require('../api')
const generateReference = require('../lib/create-reference')
const schema = require('./schemas/createPayment')
const session = require('../session')
const readData = require('../data/read-data')

module.exports = [
  {
    method: 'GET',
    path: '/create-payment',
    options: {
      handler: async (request, h) => {
        const payloadExampleRaw = readData()
        const applicantRaw = payloadExampleRaw?.landownerGainSiteRegistration?.applicant

        const applicant = {
          name: `${applicantRaw?.firstName} ${applicantRaw?.lastName}`,
          email: applicantRaw?.emailAddress
        }

        const payloadExample = JSON.stringify(payloadExampleRaw, null, 4)
        return h.view('create-payment', { reference: generateReference(), applicant, payloadExample })
      }
    }
  },
  {
    method: 'POST',
    path: '/create-payment',
    options: {
      validate: {
        payload: joi.object().concat(schema),
        failAction: async (request, h, err) => {
          console.log(err)
          return h.response('Error').code(500)
        }
      },
      handler: async (request, h) => {
        const payload = request.payload
        const res = await createPayment(payload)
        session.setPaymentReference(request, 'payment_id', res.payment_id)
        return h.redirect(res._links.next_url.href, 301)
      }
    }
  }
]
