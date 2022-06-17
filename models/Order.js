const mongoose = require(`mongoose`)

const orderSchema = mongoose.Schema({
    userAccount: {
        type: String,
        required: true
},
    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    totalBalance: {
        type: Number,
        required: true
    },
    
    purchasedOn: {
        type: Date,
        default: new Date()
    },

    details: 
        {
            userId: {
                type: String,
                required: true
            },
            productId: {
                type: String,
                required: true
            }
        }
    
})

module.exports = mongoose.model(`Orders`, orderSchema)