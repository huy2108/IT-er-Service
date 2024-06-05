const express = require('express')
const commentaryController = require('../app/Controllers/CommentaryController')
const route = express.Router()
const verifyToken = require('../app/Middleware/VerifyMiddleware')


route.post('/add', commentaryController.add)
route.get('/verify', verifyToken, commentaryController.verify)
route.get('/allComments', commentaryController.getAllComments)
route.get('/allCommentsStar', commentaryController.getAllCommentsStar)
route.get('/findUser', commentaryController.findUser)
route.patch('/updateComment', commentaryController.updateComment)


module.exports = route;