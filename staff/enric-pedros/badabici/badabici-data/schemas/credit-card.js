const { Schema } = require('mongoose')

module.exports = new Schema({
    issuer: { type: String, enum: ['visa', 'mastercard', 'american express', 'apple card'], default: 'visa', required: true },
    number: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{16}$/.test(v);
            },
            message: props => `${props.value} is not a valid credit card number`
        },
    },
    expiration: { type: Date, required: true },
    cvv: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{3}$/.test(v);
            },
            message: props => `${props.value} is not a valid CVV number`
        }
    }
})