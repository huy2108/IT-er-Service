const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const Book = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  author: { type: String, required: true },
  bookCover: { type: String },
  bookContent: { type: String, required: true },
  genre: { type: String, require: true },
  slug: { type: String, slug: 'name' }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}

);

// Add plugins
Book.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});


module.exports = mongoose.model('Book', Book);