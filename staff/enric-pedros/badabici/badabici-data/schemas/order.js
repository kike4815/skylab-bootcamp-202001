const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    user: { type: ObjectId, ref: 'User' },
    products: [{ type: ObjectId, ref: 'Product' }],
    created: { type: Date, required: true, default: Date.now },
    // totalPrice: { type: Number, required: true }
})