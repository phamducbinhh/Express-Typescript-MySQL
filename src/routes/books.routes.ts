const express = require('express')

const verifyToken = require('../middleware/verifyToken')

const { validateCreateBook } = require('../helpers/validateErrors')

const verifyRole = require('../middleware/verifyRole')

const { bookController } = require('../controllers')

const router = express.Router()

router.get('/', [verifyToken, verifyRole(['R1'])], bookController.getBooks)

router.delete('/:id', [verifyToken, verifyRole(['R1'])], bookController.deleteBook)

router.post('/', [verifyToken, verifyRole(['R1'])], validateCreateBook, bookController.createBook)

module.exports = router
