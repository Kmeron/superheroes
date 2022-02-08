const { sequelize } = require('../../db.js')
const { Superhero } = require('../../models/superhero.js')
const { Image } = require('../../models/image')
const ServiceError = require('../../ServiceError')
const Joi = require('joi')

async function showMovie ({ id }) {
  const transaction = await sequelize.transaction()

  try {
    const hero = await Superhero.findOne({
      where: {
        id
      },
      include: Image,

      transaction
    })

    if (!hero) {
      throw new ServiceError({
        message: 'Hero doesn`t exist',
        code: 'HERO_NOT_FOUND'
      })
    }
    const data = {
      nickname: hero.nickname,
      real_name: hero.real_name,
      origin_description: hero.origin_description,
      catch_phrase: hero.catch_phrase,
      superpowers: hero.superpowers,
      id: hero.id,
      images: hero.images
    }

    await transaction.commit()
    return { data }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {
  id: Joi.number()
    .required()
}

module.exports = { service: showMovie, validationRules }
