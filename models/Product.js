const mongoose = require(`mongoose`)

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    seller: {
        type: String,
        required:true
    },

    category: {
        type: Array,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    availableStock: {
        type: Number,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    review: {
        type: Array,
        default: null
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model(`Products`, productSchema)