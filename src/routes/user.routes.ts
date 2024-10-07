const express = require('express')

const verifyToken = require('../middleware/verifyToken')
const verifyRole = require('../middleware/verifyRole')

const { userController } = require('../controllers')

const router = express.Router()

router.get('/me', [verifyToken], userController.getCurrent)

router.get('/:id', [verifyToken, verifyRole(['R1'])], userController.getUserById)

module.exports = router
