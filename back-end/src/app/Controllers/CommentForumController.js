const CommentForum = require('../Models/CommentForum')
const PostForum = require('../Models/PostForum')

class CommentForumController {

    // [POST] Add a new comment for a certain forum question

    async add(req, res) {
        try {
            const { user, content, postId } = req.body;

            // Create a new comment object
            const newComment = new CommentForum({
                user,
                content
            });

            // Save the new comment
            const savedComment = await newComment.save();

            // Update the post with the new comment ID
            const updatedPost = await PostForum.findByIdAndUpdate(
                postId,
                { $addToSet: { comments: savedComment._id } },
                { new: true }
            );

            // Handle post not found
            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // Send the updated post as response
            return res.status(200).json(updatedPost);
        } catch (err) {
            console.error('Error saving comment:', err);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
    }

    addLike(req, res) {
        const { commentId, userId } = req.body; // Assuming postId and userId are sent in the request body
        // Update the likes array for the post
        CommentForum.findByIdAndUpdate(
            commentId,
            { $addToSet: { likes: userId } }, // Using $addToSet to add userId to likes array if not already present
            { new: true } // To return the updated document after update
        )
            .then(updatedPost => {
                if (!updatedPost) {
                    return res.status(404).json({ error: 'Post not found' });
                }
                res.status(200).json(updatedPost); // Send the updated post as response
            })
            .catch(err => {
                console.error('Error adding like:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    };

    removeLike(req, res) {
        const { commentId, userId } = req.body; // Assuming commentId and userId are sent in the request body

        // Update the likes array for the post
        CommentForum.findByIdAndUpdate(
            commentId,
            { $pull: { likes: userId } }, // Using $pull to remove userId from likes array
            { new: true } // To return the updated document after update
        )
            .then(updatedPost => {
                if (!updatedPost) {
                    return res.status(404).json({ error: 'Post not found' });
                }
                res.status(200).json(updatedPost); // Send the updated post as response
            })
            .catch(err => {
                console.error('Error removing like:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    };


}

module.exports = new CommentForumController;
