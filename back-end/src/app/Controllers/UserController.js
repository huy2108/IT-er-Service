const User = require("../Models/User");
const jwt = require('jsonwebtoken')

class UserController {

    // [POST] create user
    register(req, res) {
        const { firstname, lastname, username, password } = req.body

        User.findOne({ username })
            .then(user => {
                if (user) {
                    return Promise.reject({ status: 404, message: "User already existed" })
                }

                const newUser = new User({ firstname, lastname, username, password })
                newUser.save()
                return Promise.resolve({ status: 201, message: "Create a new user successfully" })
            })
            .then(data => {
                return res.status(data.status).json({ message: data.message })
            })
            .catch(error => {
                console.error('Registration failed:', error);
                const status = error.status || 500;
                const message = error.message || 'Registration failed';
                return res.status(status).json({ message });
            })

    }

    // [POST] Login authetication
    login(req, res) {
        const { username, password } = req.body
        User.findOne({ username, password })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 401, message: "Invalid username or password" })
                }
                else {
                    const jwtSecret = process.env.JWT_SECRET
                    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '5h' })
                    return res.status(200).json({ token })
                }

            })
            .catch(error => {
                const status = error.status || 500
                const message = error.message || "Internal server error"

                return res.status(status).json({ message })
            })
    }

    findUser(req, res) {
        const { id } = req.query

        User.findOne({ _id: id })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 401, message: "User is not found" })
                }
                return res.status(200).json({ firstname: user.firstname, lastname: user.lastname })
            })
            .catch(err => {
                const status = err.status || 401
                const errorMessage = err.message || "Internal Service Error"

                return res.status(status).json(errorMessage)
            })
    }

    // [GET] Get all info of user
    findUserViewUser(req, res) {
        const { id } = req.query

        // res.json(id)

        User.findOne({ _id: id })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 401, message: "User is not found" })
                }

                return res.status(200).json(user)
            })
            .catch(err => {
                const status = err.status || 401
                const errorMessage = err.message || "Internal Service Error"

                return res.status(status).json(errorMessage)
            })
    }

    // [PUT] Edit user
    editUser(req, res) {
        const { id, firstname, lastname, username } = req.body



        User.findByIdAndUpdate(id, {
            firstname,
            lastname,
            username,
        }, { new: true })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 400, message: 'Update user failed!' })
                }

                return res.status(200).json("Update user successfully!")
            })
            .catch(err => {
                const status = err.status || 401
                const errorMessage = err.message || "Internal Service Error"

                return res.status(status).json(errorMessage)
            })
    }

    //[PUT] Check user password
    checkUser(req, res) {
        const { id, oldPassword, newPassword } = req.body

        User.findOne({ _id: id, password: oldPassword })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 400, message: 'User not found!' })
                }

                return User.findByIdAndUpdate(id, { password: newPassword }, { new: true })
            })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 400, message: 'Wrong password!' })
                }
                return res.status(200).json("Update password successfully!")
            })
            .catch(err => {
                const status = err.status || 401
                const errorMessage = err.message || "Internal Service Error"

                return res.status(status).json(errorMessage)
            })
    }

    // [GET] User verification
    verify(req, res) {
        // console.log(req.user)
        return res.status(200).json({ message: 'Authenticated: User verified' })
    }

    // [GET] User verification (View Profile page), Also for QuestionDetail page
    verifyViewUser(req, res) {
        // console.log(req.user)
        return res.status(200).json({ message: 'Authenticated: User verified', user: req.user.userId })
    }

}

module.exports = new UserController;
