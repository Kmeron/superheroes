const { sequelize } = require('../../db.js')
const { Image } = require('../../models/image.js')

async function createHeroImages (payload) {
  const files = Object.values(payload).map(file => ({ id: file.filename }))
  console.log(files)
  const transaction = await sequelize.transaction()

  try {
    const result = await Image.bulkCreate(files, { transaction })
    console.log(result)
    const imageIds = result.map(image => image.id)

    await transaction.commit()
    return imageIds
  } catch (error) {
    console.log(error)
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  service: createHeroImages
}
