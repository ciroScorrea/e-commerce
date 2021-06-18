const mongoose = require('mongoose')
const validator = require('validator')
const Double = require('@mongoosejs/double')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Double,
        required: true,
        validate(value){
            if(value <=0){
                throw new Error('Values must be more than zero!')
            }
        }
    },
    image: {
        type: Buffer
    }
}, {
    collection: 'product',
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product