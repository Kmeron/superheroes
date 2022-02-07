const { sequelize, DT } = require('../db.js')

const Image = sequelize.define('image', {
  id: {
    type: DT.STRING,
    primaryKey: true
  },
  heroId: {
    type: DT.INTEGER,
    allowNull: true
  }
})

function initRelations () {
  const Superhero = sequelize.model('superhero')
  Image.belongsTo(Superhero, {
    foreignKey: 'heroId',
    sourceKey: 'id'
  })
}

module.exports = { Image, initRelations }
