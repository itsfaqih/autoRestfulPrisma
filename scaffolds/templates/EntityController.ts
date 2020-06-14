import ResourceController from '../cores/resources/ResourceController'
import EntityRepository from '../repositories/EntityRepository'

class EntityController extends ResourceController {
  constructor() {
    super(new EntityRepository())
  }
}

export default EntityController