const { sequelize } = require('../../db.js')
const { Superhero } = require('../../models/superhero.js')
const ServiceError = require('../../ServiceError.js')

async function createHero ({ imageIds, ...hero }) {
  console.log(imageIds)
  console.log(hero)
  const transaction = await sequelize.transaction()
  try {
    const isHeroExist = await Superhero.findOne({ where: { nickname: hero.nickname }, transaction })
    if (isHeroExist) {
      throw new ServiceError({
        message: 'Superhero already exists',
        code: 'INVALID_NICKNAME'
      })
    }
    const createdHero = await Superhero.create(hero, { transaction })
    await createdHero.setImages(imageIds, { transaction })
    const result = {
      nickname: createdHero.nickname,
      real_name: createdHero.real_name,
      origin_description: createdHero.origin_description,
      superpowers: createdHero.superpowers,
      id: createdHero.id,
      imageIds
    }
    transaction.commit()
    return result
  } catch (error) {
    console.log(error)
    transaction.rollback()
    throw error
  }
}

module.exports = { service: createHero }
