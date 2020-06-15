import ResourceRepository from '../cores/resources/ResourceRepository'

class UserRepository extends ResourceRepository {
  constructor() {
    super()
    this.setModel(this.prisma.users)
  }

  async findByEmail(email: string) {
    try {
      return await this.model.findOne({
        where: {
          email
        }
      })
    } catch (error) {
      throw error
    } finally {
      await this.prisma.disconnect()
    }
  }
}

export default UserRepository