import ResourceRepository from '../cores/resources/ResourceRepository'

class UserRepository extends ResourceRepository {
  constructor() {
    super()
    this.setModel(this.prisma.users)
  }
}

export default UserRepository