const userController = require('../app/Controllers/UserController')
const userRouter = require('./user')
const bookRouter = require('./book')
const commentaryRouter = require('./commentary')


// const bookController = require('../app/Controllers/BookController')

const route = (app) => {
    app.use('/api', userRouter);
    app.use('/book', bookRouter);
    app.use('/commentary', commentaryRouter);
}

module.exports = route;