import * as bodyParser from 'body-parser'
import express from 'express'

const app = express()

app.use(bodyParser.json())

const routes = require('./routes')

routes.forEach(({ endpoint, resource, controller, method }: {
  endpoint: string
  resource?: boolean
  controller: any
  method?: string
}) => {
  if (resource) {
    app.route(`${endpoint}`).get(controller.index).post(controller.store)
    app.route(`${endpoint}/:id`).get(controller.show).put(controller.update).delete(controller.destroy)
  } else {
    switch (method?.toLowerCase()) {
      case 'get':
        app.route(`${endpoint}`).get(controller)
        break;
      case 'post':
        app.route(`${endpoint}`).post(controller)
        break;
      case 'put':
        app.route(`${endpoint}`).put(controller)
        break;
      case 'delete':
        app.route(`${endpoint}`).delete(controller)
        break;
      default:
        app.route(`${endpoint}`).get(controller)
        break;
    }
  }
});

const server = app.listen(3000, () =>
  console.log(
    'Server is running on: http://localhost:3000',
  ),
)
