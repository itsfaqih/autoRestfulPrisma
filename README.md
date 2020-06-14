# autoRestfulPrisma
Simple and easy to use automated MVC-like REST API backend built using Express, powered by Prisma as the model.

You could say it's the continuation of my old [repo](https://github.com/itsfaqih/autoRestful).

## Installation
1. Clone this repo.
```bash
git clone https://github.com/itsfaqih/autoRestfulPrisma.git
cd autoRestfulPrisma
npm install
```
2. Setup database configuration.
```bash
cp ./prisma/.env.example ./prisma/.env
```
Change the DATABASE_URL to your database URL, and the provider in schema.prisma datasource.
You can see more detailed guides [here](https://www.prisma.io/docs/reference/database-connectors/connection-urls).

or you could just try it quick using the populated demo database (the dev.db) without changing any configuration.
3. Introspect the database with Prisma
```bash
npx prisma introspect
```
4. Generate Prisma Client
```bash
npx prisma generate
```

## Usage
### Repository
```typescript
// src/repositories/UserRepository.ts (you can create your own)
import ResourceRepository from '../cores/resources/ResourceRepository' // REST boilerplate repository

class UserRepository extends ResourceRepository {
  constructor() {
    super()
    this.setModel(this.prisma.users) // Set the model
  }
}

export default UserRepository
```
### Controller
```typescript
// src/controllers/UserController.ts (you can create your own)
import ResourceController from '../cores/resources/ResourceController' // REST boilerplate controller
import UserRepository from '../repositories/UserRepository'

class UserController extends ResourceController {
  constructor() {
    super(new UserRepository()) // Pass the repository
  }
}

export default UserController
```
### Route
```typescript
// src/routes.ts
// Import the controller
import UserController from './controllers/UserController'

module.exports = [
  {
    endpoint: '/users', // Set the endpoint url
    resource: true, // Set it true if it's REST controller
    controller: new UserController() // initialize the controller
  }
]
```
This will generate all restful endpoints as follows:
```
GET /users (get all user data)
POST /users (create new user)
GET /users/:id (get one user data)
PUT /users/:id (update user data)
DELETE /users/:id (delete user data)
```
NB: id parameter is using "id" field by default.
### Run the REST API Server
The server will run at Port 3000 by default
```bash
npm run dev
```