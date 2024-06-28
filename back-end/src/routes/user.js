const express = require('express')
const userController = require('../app/Controllers/UserController')
const route = express.Router()
const verifyToken = require('../app/Middleware/VerifyMiddleware')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/verify', verifyToken, userController.verify)
route.get('/findUser', userController.findUser)
route.get('/verifyViewUser', verifyToken, userController.verifyViewUser)
route.get('/findUserViewUser', userController.findUserViewUser)
route.put('/editUser', userController.editUser)
route.put('/checkUser', userController.checkUser)







module.exports = route;