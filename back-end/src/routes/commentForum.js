const express = require('express')
const commentForumController = require('../app/Controllers/CommentForumController')
const route = express.Router()
// const verifyToken = require('../app/Middleware/VerifyMiddleware')

route.post('/add', commentForumController.add)
route.post('/addLike', commentForumController.addLike)
route.post('/removeLike', commentForumController.removeLike)



module.exports = route;