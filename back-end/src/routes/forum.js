const express = require('express')
const forumController = require('../app/Controllers/ForumController')
const route = express.Router()
const authenticateUser = require('../app/Middleware/AuthenticateForum')

route.get('/verify', authenticateUser, forumController.verify)
route.post('/publishQuestion', forumController.publishQuestion)
route.get('/getAllQuestions', forumController.getAllQuestionsPending)
route.patch('/approveDisprove', forumController.approveDisprove)
route.get('/getAllQuestionsApproved', forumController.getAllQuestionsApproved)
route.get('/getAQuestion', forumController.getAQuestion)
route.post('/addLike', forumController.addLike)
route.post('/checkLike', forumController.checkLike)
route.post('/removeLike', forumController.removeLike)
route.get('/getAllComments', forumController.getAllComments)
route.get('/getAllQuestionsApprovedByUser', forumController.getAllQuestionsApprovedByUser)


module.exports = route;