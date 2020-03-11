const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    category: {type: String, required: true},
    subcategory: {type: String},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type:String, data:Buffer},
    quantity: { type: String, required: true, default: 1},
    // created: { type: Date, required: true, default: Date.now },
})