import ResourceController from '../cores/resources/ResourceController'
import UserRepository from '../repositories/UserRepository'

class UserController extends ResourceController {
  constructor() {
    super(new UserRepository())
  }
}

export default UserController