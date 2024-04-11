const Book = require("../Models/Book");


class BookController {

    // [GET] Get all books
    getAllBooks(req,res){
        const allBooks = Book.find({})

        return res.send(allBooks)
    }

    // [POST] Add a new book
    add(req,res){
        const {name, description, author, bookCover, bookContent} = req.body

        Book.findOne({name})
            .then(book => {
                if(book){
                    return Promise.reject({status: 401, message: "Book already existed"})
                }

                const newBook = new Book({
                    name,
                    description,
                    author,
                    bookCover,
                    bookContent
                })
                newBook.save()

                return res.status(200).json({
                    success: true,
                    name
                })
            })
            .catch(error => {
                const status = error.status || 500
                const message = error.message || "Internal server error"

                return res.status(status).json({message})
            })
    }

    // [DELETE] Delete a specific book
    remove(req,res){

    }
}

module.exports = new BookController;
