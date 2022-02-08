const { sequelize } = require('../../db.js')
const { Superhero } = require('../../models/superhero.js')
const { Image } = require('../../models/image.js')
const Joi = require('joi')

async function updateHero ({ removedImages, newImagesIds, id, ...hero }) {
  const transaction = await sequelize.transaction()
  try {
    const removedImagesIds = removedImages.map(image => image.id)
    await Image.destroy({ where: { id: removedImagesIds }, transaction })
    await Superhero.update({ ...hero }, { where: { id }, transaction })
    const updatedHero = await Superhero.findOne({ where: { id }, include: Image, transaction })
    const updatedHeroImages = updatedHero.images.map(image => image.id)
    await updatedHero.setImages([...updatedHeroImages, ...newImagesIds], { transaction })
    const fullUpdatedHero = await Superhero.findOne({ where: { id }, include: Image, transaction })
    const data = {
      nickname: fullUpdatedHero.nickname,
      real_name: fullUpdatedHero.real_name,
      origin_description: fullUpdatedHero.origin_description,
      catch_phrase: fullUpdatedHero.catch_phrase,
      superpowers: fullUpdatedHero.superpowers,
      id: fullUpdatedHero.id,
      images: fullUpdatedHero.images
    }

    transaction.commit()
    return data
  } catch (error) {
    transaction.rollback()
    throw error
  }
}

const validationRules = {
  id: Joi.number()
    .integer()
    .positive()
    .required(),

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

  newImagesIds: Joi.array()
    .required(),

  removedImages: Joi.array()
    .required()
}

module.exports = { service: updateHero, validationRules }
