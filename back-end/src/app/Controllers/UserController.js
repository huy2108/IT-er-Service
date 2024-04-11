const User = require("../Models/User");
const jwt = require('jsonwebtoken')  

class UserController {

    // [POST] create user
    register(req,res){
        const {firstname, lastname, username, password} = req.body
        res.json(username)

        
        User.findOne({username})
            .then(user => {
                if(user){
                    return Promise.reject({status: 404, message: "User already existed"})
                }

                const newUser = new User({firstname, lastname, username, password})
                newUser.save()
                return Promise.resolve({status:201, message:"Create a new user successfully"})
            })
            .then(data => {
                return res.status(data.status).json({message: data.message})
            })
            .catch(error => {
                console.error('Registration failed:', error);
                const status = error.status || 500;
                const message = error.message || 'Registration failed';
                return res.status(status).json({ message });
            })
        
    }

    // [POST] Login authetication
    login(req,res){
        const {username, password} = req.body
        User.findOne({username,password})
            .then(user => {
                
                if(!user){
                    return Promise.reject({status: 401, message: "Invalid username or password"})
                }

                    const jwtSecret= process.env.JWT_SECRET
                    const token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn:'5h'})
                    return res.status(200).json({token})
                
            })
            .catch(error => {
                const status = error.status || 500
                const message = error.message || "Internal server error"

                return res.status(status).json({message})
            })
    }

    // [GET] User verification
    verify(req,res){
        return res.status(200).json({message: 'Authenticated: User verified'})
    }

}

module.exports = new UserController;
