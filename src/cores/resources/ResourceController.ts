import { Request, Response } from 'express'
import Controller from '../Controller'

class ResourceController extends Controller {
  repository: any

  constructor(repository: any) {
    super()
    this.repository = repository
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async index(req: Request, res: Response) {
    try {
      const result = await this.repository.all()
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const result = await this.repository.create(req.body)
      res.send({ status: 201, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async show(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.repository.findById(id)
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.repository.update(id, req.body)
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async destroy(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.repository.delete(id)
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 200, error: error.message })
    }

  }
}

export default ResourceController