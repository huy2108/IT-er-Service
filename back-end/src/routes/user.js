const express = require('express')
const userController = require('../app/Controllers/UserController')
const route = express.Router()
const verifyToken = require('../app/Middleware/VerifyMiddleware')

route.post('/register', userController.register)
route.post('/login',userController.login)
route.get('/verify',verifyToken,userController.verify)







module.exports = route;