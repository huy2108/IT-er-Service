const express = require('express')
const userController = require('../app/Controllers/UserController')
const route = express.Router()

route.post('/register', userController.register)
route.get('/login',userController.login)








module.exports = route;