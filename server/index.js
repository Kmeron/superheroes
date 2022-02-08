const path = require('path')
const express = require('express')
const { port } = require('./config')
const router = require('./router')
const { sequelize } = require('./sequelize.js')
const cors = require('cors')

const app = express()

const pathToStaticClient = path.resolve('..', 'client', 'build')
const pathToStaticFiles = path.resolve('uploads')

app
  .use(express.json())
  .use(cors({ origin: '*' }))
  .use('/api/v1', router)
  .use(express.static(pathToStaticClient))
  .use('/static', express.static(pathToStaticFiles))

sequelize.sync({ force: true })
  .then(() => app.listen(port, () => console.log(`App listen on port ${port}`)))
  .catch(console.log)
