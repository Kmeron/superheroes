const { sequelize } = require('../../db.js')
const { Superhero } = require('../../models/superhero.js')
const ServiceError = require('../../ServiceError.js')
const Joi = require('joi')

async function createHero ({ imageIds, ...hero }) {
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
    transaction.rollback()
    throw error
  }
}

const validationRules = {
  nickname: Joi.string()
    .required(),

  real_name: Joi.string()
    .required(),

  origin_description: Joi.string()
    .required(),

  superpowers: Joi.string()
    .required(),

  catch_phrase: Joi.string()
    .required(),

  imageIds: Joi.array()
    .items(Joi.string())
    .required()

}

module.exports = { service: createHero, validationRules }
