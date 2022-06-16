const Order = require(`../models/Order`)
const User = require(`../models/User`)
const Product = require(`../models/Product`)
const auth = require(`../auth`)
const { findById, findByIdAndUpdate } = require("../models/Order")

module.exports = {
    
    createOrder: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)

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
                        totalAmount: result.price * req.body.amount,
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
                        res.send(`You have ordered ${req.body.amount} pieces of ${success.productName}`)
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
 
    },

    getAll: (req,res) => {
        Order.find().then(result => {
            res.send(result)
        })
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
            await Order.findById(req.body.orderId).then(result => {
            if(result.details.userId == userData.id){
                result.deleteOne()
                res.send(`Order Removed`)
            }
            else{
                res.send('Please log in to your account')
            }
            })
        }
        catch{
            res.send(`Order does not exist`)
        }
       
    }

    
}