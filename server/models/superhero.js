const { sequelize, DT } = require('../db.js')

const Superhero = sequelize.define('superhero', {
  id: {
    type: DT.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nickname: {
    type: DT.STRING,
    unique: true
  },
  real_name: {
    type: DT.STRING
  },
  origin_description: {
    type: DT.STRING
  },
  superpowers: {
    type: DT.STRING
  },
  catch_phrase: {
    type: DT.STRING
  }
})

function initRelations () {
  const Image = sequelize.model('image')
  Superhero.hasMany(Image, {
    foreignKey: 'heroId',
    targetKey: 'id',
    onDelete: 'cascade'
  })
}

module.exports = { Superhero, initRelations }
