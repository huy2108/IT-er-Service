const User = require("../Models/User");

class UserController {

    // [POST] create user
    register(req,res){
        const {firstname, lastname, username, password} = req.body
        
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
        

        return
    }

    login(req,res){
        const {username, password} = req.body

        User.findOne({username, password})
            .then(user => {
                if(user){

                }
            })
    }
}

module.exports = new UserController;
