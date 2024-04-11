const express = require('express')
const bookController = require('../app/Controllers/BookController')
const route = express.Router()
const upload = require('../index')

route.post('/addbook', bookController.add)
route.get('/allbooks', bookController.getAllBooks)



module.exports = route;