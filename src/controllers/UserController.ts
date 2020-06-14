import { PrismaClient } from '@prisma/client'
import Controller from './Controller'

const prisma = new PrismaClient()
const User = prisma.user

const UserController = new Controller(User)

export default UserController