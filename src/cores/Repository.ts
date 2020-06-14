import { PrismaClient } from '@prisma/client'

class Repository {
  prisma: PrismaClient = new PrismaClient()  

  constructor() {
  }
}

export default Repository
