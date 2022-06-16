const Product = require(`../models/Product`)
const auth = require(`../auth`)

module.exports = {

    productEnlist: (req,res) => {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            availableItems: req.body.availableItems
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

    deleteProduct: (req,res) => {
        Product.findById(req.body.id).then(result => {
            if(result == null){
                res.send(`Product does not exist`)
            }
            else{
                result.deleteOne()
                res.send(`Product Delisted`)
            }
        })
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
    }


}