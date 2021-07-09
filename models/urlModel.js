const mogoose = require('mongoose');

const urlSchema = new mogoose.Schema({
    original: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    }
})

module.exports = mogoose.model('urlModel', urlSchema);