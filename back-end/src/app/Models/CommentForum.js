const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete')

const CommentForum = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Add plugins
CommentForum.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});


module.exports = mongoose.model('CommentForum', CommentForum);