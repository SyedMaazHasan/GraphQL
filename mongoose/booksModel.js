const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  genre: String,
  bookId: String
});
//creating model
const booksModel = mongoose.model("books-record", schema);

module.exports = booksModel;
