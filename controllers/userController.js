const User = require(`../models/User`)
const bcrypt = require(`bcrypt`)
const auth = require(`../auth`)
const { find } = require("../models/User")

module.exports = {

    registerUser: (req,res) => {

        let pw = req.body.password

        if(req.body.email !== ''){
            
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){

               User.findOne({email: req.body.email}).then(result => {

                    if(result == null){

                            if(pw !== ''){

                                if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{8,15}$/.test(req.body.password)){

                                    const newUser = new User({

                                        email: req.body.email,

                                        password: bcrypt.hashSync(req.body.password, 10)

                                    })

                                    newUser.save().then((success, error) => {

                                        if(error){
                                            res.send(`failed`)
                                        }

                                        else{                        
                                            res.send(success)
                                        }

                                    })

                                }
                                else{
                                    res.send(`Password must contain:
                                    - One uppercase letter
                                    - One lowercase letter
                                    - One special character
                                    - One numeric character
                                    - 8 to 15 characters`)
                                }

                            }

                            else{
                                res.send(`Please input password`)
                            }


                        }

                    else{
                    res.send(`${req.body.email} is already taken`)
                    }

                    })
            }

            else{

                res.send(`You have entered an invalid email address!`)
            }
               
        }
        else{
            res.send(`Please input email`)
        }
       
    },

    getAll: (req,res) => {
        User.find().then(result => {
            res.send(result)
        })
    },

    deleteUser: async (req, res) => {

        const userData = auth.decode(req.headers.authorization)

        if(userData.isAdmin){
            User.findOne({email: req.body.email}).then(result => {

                if(result == null){

                    res.send(`User does not exist`)
                }
                else{
                
                    result.deleteOne()
                    res.send(`User deleted`)
          
                }
            })
        }
        else{

            try{

                await User.findOne({email: req.body.email}).then(result => {
                    const passMatch = bcrypt.compareSync(req.body.password, result.password)
                    if(result.email == req.body.email && passMatch){
                        result.deleteOne()
                        res.send(`User deleted`)
                }
                    else{
                        res.send(`Please input your correct email and password`)
                }
                })

            }
            catch{
                res.send(`${req.body.email} does not exist`)
            }
        }
    },
    
    login: (req,res) => {
        User.findOne({email: req.body.email}).then(result => {

            if(result == null){
                res.send(`Email does not exist`)
            }

            else{
                const passMatch = bcrypt.compareSync(req.body.password, result.password)
                    if(passMatch == true){
                        res.send({access: auth.createAccessToken(result)})
                    }
                    else{
                        res.send(`Incorrect Password`)
                    }
            }
        })
    },

    changePassword: (req,res) => {
        const userData = auth.decode(req.headers.authorization)
        
        User.findOne({email: userData.email}).then(result => {
            if(result.email !== req.body.email){
                res.send(`Incorrect Email`)
            }
            else{
                const passMatch = bcrypt.compareSync(req.body.oldPassword, result.password)
                if(passMatch == true){
                    if(req.body.oldPassword == req.body.newPassword){
                        res.send(`Please change password`)
                    }
                    else{
                        result.updateOne({$set: {
                        password: bcrypt.hashSync(req.body.newPassword, 10)
                    }}).then(result => {
                        res.send(`Password Changed`)
                    })
                    }
                    
                    
                }
                else{
                    res.send(`Incorrect Password`)
                }

            }
        })
    },

    setToAdmin: (req,res) => {
        User.findOneAndUpdate({email: req.body.email}, {$set: {

            isAdmin: req.body.isAdmin

        }}).then(result => {

            if(result == null){
                res.send(`User does not exist`)
            }

            else{
                res.send(`Status Change Success`)
            }
        })
    },

    findUser: (req,res) => {
        const data = {isAdmin: auth.decode(req.headers.authorization).isAdmin}

        if(data.isAdmin){
            User.findOne({email: req.body.email}).then(result => {

                if(result == null){
                    res.send(`User does not exist`)
                }
                else{
                    res.send(result)
                }
                
            })
        }
        else{
            res.send(`Admin Required`)
        }
    }


    
}