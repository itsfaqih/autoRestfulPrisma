const fs = require('fs')
const { COPYFILE_EXCL } = fs.constants
const [,, ...args] = process.argv

const usageMsg = 'Generate REST Controller and Repository.\nUsage: make:rest <Entity> [<table>]'

const templatePath = 'scaffolds/templates'
const controllerPath = 'src/controllers'
const repositoryPath = 'src/repositories'

const routesFile = 'src/routes.ts'

let modelName

function addRoute(entityName) {
  let data = fs.readFileSync(routesFile).toString().split("\n")
  data.splice(data.indexOf('module.exports = [\r') + 1, 0, `  {\n    endpoint: '/${modelName}',\n    resource: true,\n    controller: new ${entityName}Controller()\n  },`)
  data.splice(0, 0, `import ${entityName}Controller from './controllers/${entityName}Controller'` )
    
  let prependImport = data.join("\n")

  fs.writeFile(routesFile, prependImport, function (err) {
    if (err) return err
  })
}

function copyEntity(filePath, name, type, callback) {
  fs.copyFile(`${templatePath}/Entity${type}.ts`, `${filePath}/${name}${type}.ts`, COPYFILE_EXCL, callback)
}

function replaceEntity(filePath, entityName) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err)
    }
    let result = data.replace(/Entity/g, entityName).replace(/entity/g, modelName)
  
    fs.writeFile(filePath, result, 'utf8', function (err) {
       if (err) return console.log(err)
    })
  })
}

const capitalize = text => `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`

if (args[0] == 'make:rest') {
  if (args[1] == null) {
    console.log(usageMsg)
    return
  }
  if (args[2] != null) {
    modelName = args[2]
  } else {
    modelName = args[1].toLowerCase()
  }

  const EntityName = capitalize(args[1])
  
  copyEntity(controllerPath, EntityName, 'Controller', () => replaceEntity(`${controllerPath}/${EntityName}Controller.ts`, EntityName))
  copyEntity(repositoryPath, EntityName, 'Repository', () => replaceEntity(`${repositoryPath}/${EntityName}Repository.ts`, EntityName))
  addRoute(EntityName)

  console.log(`Generated: ${EntityName}Controller`)
  console.log(`Generated: ${EntityName}Repository`)
  return
}
console.log(usageMsg)