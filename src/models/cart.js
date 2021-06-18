const Double = require('@mongoosejs/double/lib')
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema( {
    status: {
        type: String,
        required: true,
        default: 'open'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User' //it has to be the same name in user mongoose.model user file.
    },
    products: [{
        _id: false,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    qtyTotal: {
        type: Number,
        required: false,
        default: 0
    },
    valueTotal: {
        type: Double,
        required: false
    }
}, {
    collection: 'cart',
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

cartSchema.pre('save', async function (next){
    const cart = this
    next()
})

module.exports = Cart