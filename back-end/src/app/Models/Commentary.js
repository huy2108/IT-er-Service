const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete')

const Commentary = new Schema({
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  star: { type: Number },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}

);

// Add plugins
Commentary.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});


module.exports = mongoose.model('Commentary', Commentary);