import UserController from './controllers/UserController'

module.exports = [
  {
    endpoint: '/users',
    resource: true,
    controller: new UserController()
  },
  {
    endpoint: '/whose_email',
    controller: (new UserController()).whoseEmail
  }
]