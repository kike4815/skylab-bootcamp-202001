const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    category: {type: String, required: true},
    subcategory: {type: String},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type:String },
    quantity: { type: String, required: true, default: 1},
    discount: {type: Number, required: true, default:1}, //for new discounts 
    created: { type: Date , default: Date.now },

})