import * as express from 'express'
import { createCertificate } from 'pem'
import * as cors from 'cors'
import { createServer } from 'https'
import { random } from 'lodash'

createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }

  let app = express()

  app
  .use(express.json())
  .use(cors())
    .post('/api/representative_points', (req, res) => {

      if (req.body.serviceAreaIds.length < 1) {
        return res.send([])
      }

      res.send(require('./mocks/respresentative_points.json').map(_ => ({
        ..._,
        population: random(100, 100000)
      })))
    })

    .post('/api/providers', (req, res) =>
      res.send({
        successes: require('./mocks/providers.json'),
        errors: []
      })
    )

  createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(9001)
})
