import UserController from './controllers/UserController'

module.exports = [
  {
    endpoint: '/users',
    resource: true,
    controller: new UserController()
  }
]