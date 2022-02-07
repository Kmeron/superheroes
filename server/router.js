const express = require('express')
const router = express.Router()
const controllers = require('./controllers')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname = uuidv4())
  }
})

const upload = multer({ storage: storage })

router
  .route('/superheroes')
  .post(controllers.superheroes.create)
  .get(controllers.superheroes.list)

router
  .route('/superheroes/:id')
  .get(controllers.superheroes.show)
  .delete(controllers.superheroes.remove)
  .patch(controllers.superheroes.update)

router
  .route('/superheroes/images')
  .post(upload.any(), controllers.images.create)

module.exports = router
