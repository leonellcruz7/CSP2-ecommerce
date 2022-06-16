const Product = require(`../models/Product`)
const auth = require(`../auth`)

module.exports = {

    productEnlist: (req,res) => {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            availableStock: req.body.availableStock
        })

            newProduct.save()
            res.send(newProduct)
        

        
    },

    getAll: (req,res) => {
        Product.find().then(result => {
            res.send(result)
        })
    },

    searchProduct: (req,res) => {
        Product.find({name: req.body.name}).then(result => {
            if(result.length == 0){
                res.send(`Product does not exist`)
            }
            else{
                res.send(result)
            }
        })
    },

    deleteProduct: async (req,res) => {
        try{
        await Product.findById(req.body.id).then(result => {
                result.deleteOne()
                res.send(`Product Delisted`)
        })
        }
        catch{
            res.send(`Product does not exist`)
        }
    },

    updateProduct: async (req,res) => {

        try{
            await Product.findByIdAndUpdate({_id: req.params.id}, {$set: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            }}).then(result => {
                res.send(`Product Updated`)
            })
        }

        catch{
            res.send(`Product not found`)
        }
    },

    addStock: async (req,res) => {
        try{
            Product.findById(req.params.id).then(result => {
                result.updateOne({$set: {
                    availableStock: result.availableStock + req.body.amount,
                    isActive: true
                }}).then(result => {})
            })

            Product.findById(req.params.id).then(result => {
                res.send(`${result.name} has been restocked to ${result.availableStock + req.body.amount}`)
            })
        
        }
        catch{
            res.send(`Product not found`)
        }
    }




}