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
      res.status(200).send({ data: result })
    } catch (error) {
      res.status(200).send({ error: error.message })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const result = await this.repository.create(req.body)
      res.status(201).send({ data: result })
    } catch (error) {
      res.status(422).send({ error: error.message })
    }
  }

  async show(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.repository.findById(id)
      res.status(200).send({ data: result })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.repository.update(id, req.body)
      res.status(204).send({ data: result })
    } catch (error) {
      res.status(422).send({ error: error.message })
    }
  }

  async destroy(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.repository.delete(id)
      res.status(200).send({ data: result })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }

  }
}

export default ResourceController