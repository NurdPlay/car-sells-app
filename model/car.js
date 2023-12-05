const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    }, {
        timestamps: true
});

const Car = mongoose.model('Car', carSchema)
module.exports = Car;