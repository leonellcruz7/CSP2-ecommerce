const Order = require(`../models/Order`)
const User = require(`../models/User`)
const Product = require(`../models/Product`)
const auth = require(`../auth`)
const { findById, findByIdAndUpdate } = require("../models/Order")

module.exports = {
    
    createOrder: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        try{
            if(userData.isAdmin == false){
                try{
                await Product.findById(req.body.productId).then(result => {
                    
                    if(result.availableStock !== 0){
                        if(result.availableStock >= req.body.amount){
                                result.updateOne({$set: {
                                    availableStock: result.availableStock - req.body.amount,        
                                }}).then(result => {})
                            
                            

                            const newOrder = new Order({
                                userAccount: userData.email,
                                productName: result.name,
                                quantity: req.body.amount,
                                totalBalance: result.price * req.body.amount,
                                details: {
                                    
                                    userId: userData.id,
                                    productId: req.body.productId
                                }
                            })
                            
                            return newOrder.save().then((success, error) => {
                                if(error){
                                    return false;
                                }
                                else{
                                res.send(`You have ordered ${req.body.amount} piece/s of ${success.productName}`)
                                }
                            })
                        }

                        else{
                            res.send(`Sorry! Stock is not sufficient.`)
                        }
                    }
                    else{
                        res.send(`${result.name} is sold out`)
                    }
        
                })

                await Product.findById(req.body.productId).then(result => {
                    if(result.availableStock == 0){
                        result.updateOne({$set: {
                            isActive: false
                        }}).then(result => {})
                    }
                    else{

                    }
                })

                }
                catch{
                    res.send(`Product not found`)
                }
            }
            else{
                res.send(`Please use a regular account`)
            }
        }
        catch{
            res.send(`Please use a regular account`)
        }
    },

    getAll: (req,res) => {
        const userData = auth.decode(req.headers.authorization)

            if(userData.isAdmin){
                Order.find().then(result => {
                    res.send(result)
                })
            }
            else{
                res.send(`Please login an admin account`)
            }
       
    },

    getMyOrders: (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        Order.find({userAccount: userData.email}).then(result => {
            res.send(result)
        })
        
    },

    removeOrder: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        try{
            const orderDetails = await Order.findById(req.body.orderId).then(result => {
            
            if(result.details.userId == userData.id){
                
                result.deleteOne()
                res.send(`Order Removed`)
                return result
                     
            }

            else{
                res.send('Please log in to your account')
            }
            })

            Product.findById({_id: orderDetails.details.productId}).then(result => {
                result.updateOne({$set: {
                    availableStock: result.availableStock + orderDetails.quantity,
                    isActive: true
                }}).then(result => {})
            })
            
        }
        catch{
            res.send(`Order does not exist`)
        }
       
    }

    
}