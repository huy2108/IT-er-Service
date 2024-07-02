const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const PostForum = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'CommentForum' }],
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    slug: { type: String, slug: 'title' }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Add plugins
PostForum.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});


module.exports = mongoose.model('PostForum', PostForum);