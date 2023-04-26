const User = require("../models/User.model")

exports.registerUser = (req, res) => {
    const user = req.body
    User.create(user)
        .then(data => {
            res.status(201).json({
                user: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot register user"
            })
        })
}

exports.loginUser = (req, res) => {
    const username = req.body.username
    const inputPassword = req.body.password

    User.findByPk(username)
        .then(user => {
            if(!user || inputPassword !== user.password){
                return res.status(401).json({
                    message: "Incorrect username or password"
                })
            }
            res.status(200).json({
                user
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot find user"
            })
        })
}