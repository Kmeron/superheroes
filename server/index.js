const path = require('path')
const express = require('express')
const { port } = require('./config')
const router = require('./router')
const { sequelize } = require('./sequelize.js')
const cors = require('cors')

const app = express()

const pathToStaticFiles = path.resolve('uploads')

app
  .use(express.json())
  .use(cors({ origin: '*' }))
  .use('/api/v1', router)
  .use('/static', express.static(pathToStaticFiles))

sequelize.sync()
  .then(() => app.listen(port, () => console.log(`App listen on port ${port}`)))
  .catch(console.log)
