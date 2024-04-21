const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete')


const Book = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    author: { type: String, required: true},
    bookCover: {type: String, required: true},
    bookContent: {type: String, required: true},
    genre: {type: String, require: true}
  },{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
  
);

// Add plugins
Book.plugin(mongooseDelete,{
  deletedAt: true,
  overrideMethods: 'all',
});  

module.exports = mongoose.model('Book', Book);