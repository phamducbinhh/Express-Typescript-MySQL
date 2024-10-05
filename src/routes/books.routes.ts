const express = require('express')

const verifyToken = require('../middleware/verifyToken')

const verifyRole = require('../middleware/verifyRole')

const { bookController } = require('../controllers')

const router = express.Router()

router.get('/', [verifyToken, verifyRole(['R1'])], bookController.getBooks)

module.exports = router
