
const userController = require('../app/Controllers/UserController')
const userRouter = require('./user')

const route = (app) => {
    app.use('/api', userRouter);
}

module.exports = route;