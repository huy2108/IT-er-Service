const Book = require("../Models/Book");


class BookController {

    // [GET] Get all books
    getAllBooks(req,res){
        Book.find({})
            .then(allBooks => {
                return res.send(allBooks)
            })
            .catch(error => {
                return res.status(500).send('Internal Server Error')
            })
    }


    // [GET] Get a specific genre of book
    getGenre(req,res) {
        const genre = req.query.genre

        Book.find({genre})
            .then(book => {
                res.send(book)
            })
            .catch(error => {
                return res.status(500).send('Internal Server Error')
            })
    }

    // [GET] Get all genres 
    getAllGenres(req,res){
        Book.distinct('genre')
            .then(genres => {
                return res.send(genres)
            })
            .catch(error => {
                return res.status(500).send('Internal Server Error')
            })
    }

    // [POST] Add a new book
    add(req,res){
        const {name, description, author, bookCover, bookContent, genre} = req.body

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
                    bookContent,
                    genre
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
