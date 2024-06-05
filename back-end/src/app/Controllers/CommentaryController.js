const Commentary = require('../Models/Commentary')
const mongoose = require('mongoose');

class CommentaryController {

    // [POST] Add a new comment
    add(req, res) {
        const { commenter, book, content, star } = req.body;

        Commentary.findOne({ commenter, book })
            .then(existingComment => {
                if (existingComment) {
                    return res.status(401).json({ success: false, message: "You have already commented on this book" });
                }

                let newCommentaryData = {
                    commenter,
                    book,
                    content
                };

                if (star !== undefined) {
                    newCommentaryData.star = star;
                }

                const newCommentary = new Commentary(newCommentaryData);

                return newCommentary.save();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    return Promise.reject({ status: 401, message: "Failed to add a new comment" });
                }
                return res.status(200).json(data);
            })
            .catch(error => {
                console.error(error);
                const errorMessage = error.message || "Failed to add a comment";
                return res.status(500).json({ success: false, message: errorMessage });
            });
    }


    updateComment(req, res) {
        const { commenter, book, star, content } = req.body

        Commentary.findOneAndUpdate(
            { book, commenter }, // Find criteria
            { star, content }, // Update data
            { new: true, runValidators: true } // Options: return the updated document and run validators
        )
            .then(updatedComment => {
                if (!updatedComment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                res.status(200).json(updatedComment);
            })
            .catch(error => {
                res.status(500).json({ message: 'Error updating comment', error: error.message });
            })
    }

    // [GET] Get a specific book based on book and commenter
    findUser(req, res) {

        const { commenter, book } = req.query

        Commentary.findOne({ commenter, book })
            .then(data => {
                if (!data || data.length === 0) {
                    return Promise.reject({ status: 401, message: "No user found for this book" })
                }
                return res.status(200).json(data)
            })
            .catch(err => {
                const errorMessage = err.message || "Internal Server Error"

                return res.status(401).json(errorMessage)
            })
    }

    // [GET] Get all comments of a specific book
    getAllComments(req, res) {
        const bookId = req.query.bookId
        Commentary.find({ book: bookId })
            .sort({ updatedAt: -1 })
            .then(data => {
                if (!data || data.length === 0) {
                    return Promise.reject({ status: 401, message: "No comments found" })
                }
                return res.status(201).json(data)
            })
            .catch(error => {
                const err = error.message || "Internal Server error"
                return res.status(401).json(err)
            })

    }

    // [GET] Get all comments having star attribute of a specific book
    getAllCommentsStar(req, res) {
        const bookId = req.query.bookId;
        Commentary.find({ book: bookId, star: { $exists: true } }) // Filter comments with 'star' attribute
            .sort({ createdAt: -1 })
            .then(data => {
                if (!data || data.length === 0) {
                    return res.status(401).json({ message: "No starred comments found" });
                }
                return res.status(200).json(data);
            })
            .catch(error => {
                const err = error.message || "Internal Server error";
                return res.status(500).json({ message: err });
            });
    }

    // [GET] Verify the user
    verify(req, res) {
        // console.log(req.user)
        return res.status(200).json({ message: 'Authenticated: User verified', user: req.user })
    }
}

module.exports = new CommentaryController;