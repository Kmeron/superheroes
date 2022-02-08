const { sequelize } = require('../../db.js')
const { Superhero } = require('../../models/superhero.js')
const ServiceError = require('../../ServiceError')
const Joi = require('joi')

async function deleteSuperhero ({ id }) {
  const transaction = await sequelize.transaction()

  try {
    const result = await Superhero.destroy({
      where: {
        id
      },
      transaction
    })

    if (!result) {
      throw new ServiceError({
        message: 'Provided non-existent superhero id',
        code: 'INVALID_SUPERHERO_ID'
      })
    }
    await transaction.commit()
    return {}
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validationRules = {
  id: Joi.number()
    .required()
}

module.exports = { service: deleteSuperhero, validationRules }
