const Order = require(`../models/Order`)
const User = require(`../models/User`)
const Product = require(`../models/Product`)
const auth = require(`../auth`)

module.exports = {
    
    createOrder:  (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        const itemOrdered = Product.findById(req.body.productId).then(result => {

            const newOrder = new Order({
                totalAmount: result.price * req.body.amount,
                details: {
                    userId: userData.id,
                    productId: req.body.productId
                }
            })

            newOrder.save()
            res.send(`Order Placed`)

        })




        // const newOrder = new Order({
        //     totalAmount: 1,
        //     details: [{
        //         userId: req.body.userId,
        //         productId: req.body.productId
        //     }]
        // })
        // newOrder.save()
        // res.send(`Order Placed`)
        
        

    
        
        
    },

    getAll: (req,res) => {
        Order.find().then(result => {
            res.send(result)
        })
    },

    removeOrder: (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        Order.findById(req.body.orderId).then(result => {
            if(result.details.userId == userData.id){
                result.deleteOne()
                res.send(`Order Removed`)
            }
            else{
                res.send('Please log in to your account')
            }
        })
    }

    


    
}