import { Request, Response } from "express"

class Controller {
  model: any

  constructor(Model: any) {
    this.model = Model
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async index(req: Request, res: Response) {
    try {
      const result = await this.model.findMany()
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const result = await this.model.create({
        data: {
          ...req.body,
        },
      })
      res.send({ status: 201, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async show(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.model.findOne({
        where: {
          id
        }
      })
  
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.model.update({
        where: { id },
        data: {
          ...req.body
        },
      })
      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 422, error: error.message })
    }
  }

  async destroy(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    try {
      const result = await this.model.delete({
        where: { id }
      })

      res.send({ status: 200, data: result })
    } catch (error) {
      res.send({ status: 200, error: error.message })
    }

  }
}

export default Controller
