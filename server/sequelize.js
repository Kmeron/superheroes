const sequelize = require('./db.js')
const superhero = require('./models/superhero')
const image = require('./models/image')

const models = {
  Superhero: superhero.Superhero,
  Image: image.Image
}

const initRelationsModels = [

  superhero.initRelations,
  image.initRelations
]

initRelationsModels.forEach(initRelations => initRelations())

module.exports = {
  ...sequelize,
  ...models
}
