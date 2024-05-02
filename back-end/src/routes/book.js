const express = require('express')
const bookController = require('../app/Controllers/BookController')
const route = express.Router()

route.post('/addbook', bookController.add)
route.get('/allbooks', bookController.getAllBooks)
route.get('/getAllGenres', bookController.getAllGenres)
route.get('/getGenre', bookController.getGenre)
route.get('/getABook', bookController.getABook)


module.exports = route;