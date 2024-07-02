const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const authenticateUser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token

    const jwtSecret = process.env.JWT_SECRET
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        console.log(decoded.userId)

        User.findOne({ _id: decoded.userId })
            .then(user => {
                if (!user) {
                    return Promise.reject({ status: 401, message: "User is not found" })
                }

                req.user = user;
                next()
            })
            .catch(err => {
                const status = err.status || 401
                const errorMessage = err.message || "Internal Service Error"

                return res.status(status).json(errorMessage)
            })

    });
};

module.exports = authenticateUser;