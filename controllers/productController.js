const Product = require(`../models/Product`)
const auth = require(`../auth`)

module.exports = {

    productEnlist: (req,res) => {

    const userData = auth.decode(req.headers.authorization)
    if(userData.isAdmin == true){
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            availableStock: req.body.availableStock
        })

            newProduct.save()
            res.send(newProduct)
        
    }
    else{
        res.send(`Admin required`)
    }
        

        
    },

    getAll: (req,res) => {
        Product.find().then(result => {
            res.send(result)
        })
    },

    getId: (req,res) => {
        Product.findById(req.params.id).then(result => {
            res.send(result)
        })
    },

    searchName: (req,res) => {
        Product.find({name: req.params.id}).then(result => {
            if(result.length == 0){
                res.send(`Product does not exist`)
            }
            else{
                res.send(result)
            }
        })
    },

    getActive: (req,res) => {
        Product.find({isActive: true}).then(result => {
            res.send(result)
        })
    },

    deleteProduct: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)
        if(userData.isAdmin == true){
            try{
            await Product.findById(req.body.id).then(result => {
                    result.deleteOne()
                    res.send(`Product Delisted`)
            })
            }
            catch{
                res.send(`Product does not exist`)
            }
        }
        else{
            res.send(`Admin Required`)
        }
    },

    updateProduct: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        if(userData.isAdmin == true){
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
        else{
            res.send(`Admin Required`)
        }
    },

    addStock: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        if(userData.isAdmin == true){
            try{
                await Product.findById(req.params.id).then(result => {
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
        else{
            res.send(`Admin Required`)
        }
        
    },

    archive: async (req,res) => {
        const userData = auth.decode(req.headers.authorization)

        if(userData.isAdmin == true){

            try{
                await Product.findByIdAndUpdate({_id: req.params.Id}, {$set: {
                    isActive: false
                }}).then(result => {
                    res.send(`Product has been archived`)
                })
            }
            catch{
                res.send(`Product not found`)
            }
                
        }

        else{
            res.send(`Admin Required`)
        }
    }




}