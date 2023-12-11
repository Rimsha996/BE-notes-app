const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const notes = new Schema({
    title:{
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notes' , notes);