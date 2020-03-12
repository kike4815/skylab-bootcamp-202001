const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // birthday: {type: Date}
    chart: {
        type: [{ type: ObjectId, ref: 'Product' }]
    },
    member: { type: Boolean, required: true, default: false },
    role: { type: String, enum: ['client', 'superadmin'], default: 'client' },
    orders: { type: ObjectId, ref: 'Order' } //history of orders

    //creditCards: { type: [{ type: CreditCard }] }
    // creditCards: [creditCard]
})