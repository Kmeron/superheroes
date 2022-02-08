const { sequelize } = require('../../db.js')
const { Image } = require('../../models/image.js')
const Joi = require('joi')

async function createHeroImages (payload) {
  const files = Object.values(payload).map(file => ({ id: file.filename }))
  const transaction = await sequelize.transaction()

  try {
    const result = await Image.bulkCreate(files, { transaction })
    const imageIds = result.map(image => image.id)

    await transaction.commit()
    return imageIds
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {
  0: Joi.object(),
  1: Joi.object(),
  2: Joi.object(),
  3: Joi.object(),
  4: Joi.object(),
  5: Joi.object(),
  6: Joi.object(),
  7: Joi.object(),
  8: Joi.object()
}
module.exports = {
  service: createHeroImages,
  validationRules
}
