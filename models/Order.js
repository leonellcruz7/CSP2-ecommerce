const mongoose = require(`mongoose`)

const orderSchema = mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true
    },
    purchasedOn: {
        type: Date,
        required: new Date()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    details: [
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
    ]
})

module.exports = mongoose.model(`Orders`, orderSchema)