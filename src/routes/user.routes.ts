const express = require('express')

const verifyToken = require('../middleware/verifyToken')

const { userController } = require('../controllers')

const router = express.Router()

router.get('/:id', [verifyToken], userController.getUserById)

module.exports = router
