import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const app = express()

app.use(bodyParser.json())

const routes = require('./routes')

routes.forEach(({ endpoint, resource, controller }: {
  endpoint: string
  resource: boolean
  controller: any
}) => {
  if (resource) {
    app.route(`${endpoint}`).get(controller.index).post(controller.store)
    app.route(`${endpoint}/:id`).get(controller.show).put(controller.update).delete(controller.destroy)
  }
});

const server = app.listen(3000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
  ),
)
