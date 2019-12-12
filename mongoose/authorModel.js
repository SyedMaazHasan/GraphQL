
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    authorId: String
});
//creating model
const authorModel = mongoose.model('author-record', schema);


module.exports = authorModel;
