import React, { useState, useEffect } from 'react'
import './BookChain.css'
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom'

export const BookChain = ({ books, amount, header }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [relatedBooks, setRelatedBooks] = useState([])

    useEffect(() => {
        setRelatedBooks(books)
    }, [books])

    const prevBook = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const nextBook = () => {
        if (currentIndex < books.length - amount) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="relatedBookContainer">
            <h1>{header}</h1>
            <div className="relatingBooks">
                <div className='carousel'>
                    {relatedBooks ? relatedBooks.slice(currentIndex, currentIndex + amount).map((book, index) => (
                        <Link key={index} className='book' to={`/books/library/${book.slug}`} >
                            <img src={book.bookCover} alt="" />
                            <p>{book.name}</p>
                        </Link>
                    )) : ''}
                </div>
                <Icon.ChevronLeft size={48} onClick={prevBook} className='prev' />
                <Icon.ChevronRight onClick={nextBook} className='next' size={48} />
            </div>
        </div>
    )
}
