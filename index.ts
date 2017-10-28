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
  .use(cors())
    .post('/api/representative_points', (req, res) =>
      res.send(require('./mocks/respresentative_points.json').map(_ => ({..._, population: random(100, 100000)})))
    )

  createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(9001)
})
