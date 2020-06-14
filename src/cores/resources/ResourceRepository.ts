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
    try {
      return await this.model.findMany()
    } catch (error) {
      throw error
    } finally {
      await this.prisma.disconnect()
    }
  }

  async create(data: any) {
    try {
      return await this.model.create({
        data: {
          ...data,
        },
      })
    } catch (error) {
      throw error
    } finally {
      await this.prisma.disconnect()
    }
  }

  async findById(id: number) {
    try {
      return await this.model.findOne({
        where: {
          id
        }
      })
    } catch (error) {
      throw error
    } finally {
      await this.prisma.disconnect()
    }
  }

  async update(id: number, data: any) {
    try {
      return await this.model.update({
        where: { id },
        data: {
          ...data
        },
      })
    } catch (error) {
      throw error
    } finally {
      await this.prisma.disconnect()
    }
  }

  async delete(id: number) {
    try {
      return await this.model.delete({
        where: { id }
      })
    } catch (error) {
      throw error
    } finally {
      await this.prisma.disconnect()
    }
  }
}

export default ResourceRepository
