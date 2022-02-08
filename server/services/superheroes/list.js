const { sequelize } = require('../../db.js')
const { Superhero } = require('../../models/superhero.js')
const { Image } = require('../../models/image.js')
const ServiceError = require('../../ServiceError.js')
const Joi = require('joi')

async function listHeroes ({ limit, offset }) {
  const transaction = await sequelize.transaction()
  const query = {
    order: [['id', 'DESC']],
    limit: +limit,
    offset: +offset,
    distinct: true,
    include: Image
  }

  try {
    const { rows, count } = await Superhero.findAndCountAll({ ...query, transaction })
    const meta = { limit, offset, totalCount: count }
    const data = rows.map(hero => {
      return {
        nickname: hero.nickname,
        id: hero.id,
        imageIds: hero.images[0]
      }
    })
    await transaction.commit()
    return { data, meta }
  } catch (error) {
    await transaction.rollback()
    if (['ER_PARSE_ERROR', 'ER_SP_UNDECLARED_VAR'].includes(error.code)) {
      throw new ServiceError({
        message: 'Provided invalid data for getting note',
        code: 'INVALID_DATA'
      })
    }
    throw error
  }
}

const validationRules = {
  limit: Joi.string()
    .required(),
  offset: Joi.string()
    .required()
}

module.exports = { service: listHeroes, validationRules }
