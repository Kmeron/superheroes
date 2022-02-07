const { makeServiceRunner } = require('./makeServiceRunner')

const create = require('../services/superheroes/create')
const list = require('../services/superheroes/list')
const remove = require('../services/superheroes/remove')
const update = require('../services/superheroes/update')
const show = require('../services/superheroes/show')

module.exports = {
  list: makeServiceRunner(list, (req, res) => ({ ...req.query })),
  create: makeServiceRunner(create, (req, res) => ({ ...req.body, ...req.files })), // body or files??
  show: makeServiceRunner(show, (req, res) => ({ ...req.params })),
  remove: makeServiceRunner(remove, (req, res) => ({ ...req.params })),
  update: makeServiceRunner(update, (req, res) => ({ ...req.params, ...req.body }))
}
