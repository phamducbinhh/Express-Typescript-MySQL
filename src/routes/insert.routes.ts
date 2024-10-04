const express = require('express')

const { insertController } = require('../controllers')

const router = express.Router()

router.get('/', insertController.insert)

module.exports = router
