import ResourceRepository from '../cores/resources/ResourceRepository'

class EntityRepository extends ResourceRepository {
  constructor() {
    super()
    this.setModel(this.prisma.entity)
  }
}

export default EntityRepository