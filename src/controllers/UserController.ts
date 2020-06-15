import ResourceController from '../cores/resources/ResourceController'
import UserRepository from '../repositories/UserRepository'
import { Request, Response } from 'express'

class UserController extends ResourceController {
  constructor() {
    super(new UserRepository())
    this.whoseEmail = this.whoseEmail.bind(this)
  }

  async whoseEmail(req: Request, res: Response) {
    try {
      const user = await this.repository.findByEmail(req.query.email)

      if (user != null) {
        res.send({ data: user })
      } else {
        res.send({ data: null })
      }
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }
}

export default UserController