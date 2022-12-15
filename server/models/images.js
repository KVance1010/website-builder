const { Schema } = require('mongoose');

const imageSchema = new Schema({
    url: {
        type: String,
        required: true
    }, 
    imageTag: {
        type: String,
        required: false
    }
});

module.exports = imageSchema;

