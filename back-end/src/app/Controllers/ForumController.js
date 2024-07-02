const PostForum = require("../Models/PostForum");


class ForumController {

    // [POST] Create a new question in client-side
    publishQuestion(req, res) {
        const { title, content, userId } = req.body

        const newQuestion = new PostForum({
            title,
            content,
            user: userId,
            status: 'pending',
        })

        newQuestion.save()
            .then(question => {
                res.status(201).json(question);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    }

    getAllComments(req, res) {

        const { postId } = req.query

        PostForum.findById(postId)
            .populate({
                path: 'comments',
                options: { sort: { createdAt: -1 } } // Sort comments by createdAt in descending order
            })  // Populate the comments field
            .then(post => {
                if (!post) {
                    return res.status(404).json({ error: 'Post not found' });
                }
                res.status(200).json(post.comments); // Return the comments
            })
            .catch(err => {
                console.error('Error retrieving comments:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });

    }

    // [PATCH] Add like to a Post Forum
    addLike(req, res) {
        const { postId, userId } = req.body; // Assuming postId and userId are sent in the request body
        // Update the likes array for the post
        PostForum.findByIdAndUpdate(
            postId,
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
        const { postId, userId } = req.body; // Assuming postId and userId are sent in the request body

        // Update the likes array for the post
        PostForum.findByIdAndUpdate(
            postId,
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


    checkLike(req, res) {
        const { postId, userId } = req.body; // Assuming postId and userId are sent in the request body

        // Find the post by postId and check if userId exists in the likes array
        PostForum.findById(postId)
            .then(post => {
                if (!post) {
                    return res.status(404).json({ error: 'Post not found' });
                }

                const hasLiked = post.likes.includes(userId);
                res.status(200).json({ hasLiked });
            })
            .catch(err => {
                console.error('Error checking like:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    };

    // [GET] Get a specific question
    getAQuestion(req, res) {
        const { slug } = req.query

        PostForum.findOne({ slug })
            .then(question => {
                if (!question) {
                    return Promise.reject({ status: 400, message: 'No question found!' })
                }

                return res.status(200).json(question)
            })
            .catch(err => {
                const errorStatus = err.status || 500
                const errorMessage = err.message || 'Internal Server Error'

                return res.status(errorStatus).json(errorMessage)
            })
    }

    // [GET] Get all questions with pending status
    getAllQuestionsPending(req, res) {
        PostForum.find({ status: 'pending' })
            .sort({ createdAt: -1 })
            .then(questions => {
                if (!questions) {
                    return Promise.reject({ status: 400, message: 'No questions found' })
                }

                return res.status(200).json(questions)
            })
            .catch(err => {
                const errorStatus = err.status || 500
                const errorMessage = err.message || 'Internal Server Error'

                return res.status(errorStatus).json(errorMessage)
            })
    }

    // [GET] Get all questions approved
    getAllQuestionsApproved(req, res) {
        PostForum.find({ status: 'accepted' })
            .sort({ createdAt: -1 })
            .then(questions => {
                if (!questions) {
                    return Promise.reject({ status: 400, message: 'No questions found' })
                }

                return res.status(200).json(questions)
            })
            .catch(err => {
                const errorStatus = err.status || 500
                const errorMessage = err.message || 'Internal Server Error'

                return res.status(errorStatus).json(errorMessage)
            })
    }

    // [PATCH] Approve or Disprove the questions
    approveDisprove(req, res) {
        const { id, status } = req.body

        PostForum.findByIdAndUpdate(id, { status }, { new: true })
            .then(post => {
                if (!post) {
                    return Promise.reject({ status: 400, message: 'No post found' })
                }

                return res.status(200).json({ message: 'Successfully approve the question!' })
            })
            .catch(error => {
                const errorStatus = error.status || 500
                const errorMessage = error.message || "Internal Server Error"

                return res.status(errorStatus).json(errorMessage)
            })
    }


    // [GET] Verify User for creating a question
    verify(req, res) {
        return res.status(200).json(req.user)
    }

}

module.exports = new ForumController;
