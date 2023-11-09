const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    "title": { type: String, required: true },
    "question": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
    "votes": { type: Number }
})

module.exports = mongoose.model('optionData', optionSchema) 