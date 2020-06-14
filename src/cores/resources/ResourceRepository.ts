import Repository from '../Repository'

class ResourceRepository extends Repository {
  model: any

  constructor() {
    super()
    this.all = this.all.bind(this)
    this.create = this.create.bind(this)
    this.findById = this.findById.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  setModel(model: any) {
    this.model = model
  }

  async all() {
    return await this.model.findMany()
  }

  async create(data: any) {
    return await this.model.create({
      data: {
        ...data,
      },
    })
  }

  async findById(id: number) {
    return await this.model.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, data: any) {
    return await this.model.update({
      where: { id },
      data: {
        ...data
      },
    })
  }

  async delete(id: number) {
    return await this.model.delete({
      where: { id }
    })
  }
}

export default ResourceRepository
