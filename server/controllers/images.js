const { makeServiceRunner } = require('./makeServiceRunner')

const create = require('../services/images/create')

module.exports = {
  create: makeServiceRunner(create, (req, res) => ({ ...req.files }))

}
