const mongoose = require('mongoose');
//schema of model
const bookSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
    trim: true
},
price : {
    type: Number,
    required: true,
    min: 0
},
category : {
    type: String,
    required: true
},
coverImageUrl: {
    type: String,
    required: true,
    default: "https://yourcdn.com/default-book-cover.jpg"
},
title: {
    type : String,
    required: true
}

});
const Book =mongoose.model('Book',bookSchema);
//export
module.exports = Book;