import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import './BookSearch.css';  // Import the CSS file

const BookSearch = ({ allBooks }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [books, setBooks] = useState([]);
    const fuseRef = useRef(null);

    useEffect(() => {
        if (allBooks && allBooks.length > 0) {
            setBooks(allBooks);
        }
    }, [allBooks]);

    useEffect(() => {
        if (books && books.length > 0) {
            // console.log(books)
            fuseRef.current = new Fuse(books, {
                keys: ['name'], // Adjust based on your data structure
                includeScore: true,
                threshold: 0.3,
            });
        }
    }, [books]);

    const handleSearch = (event) => {
        const query = event.target.value;
        setQuery(query);

        if (query.trim() !== "" && fuseRef.current) {
            const results = fuseRef.current.search(query).map(result => result.item);
            setResults(results);
        } else {
            setResults([]);
        }
    };

    console.log(results)

    return (
        <div className="book-search-container">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for a book"
                className="book-search-input"
            />
            {query !== '' &&
                <ul className="book-search-results">
                    {results.map((book, index) => (
                        <li key={index}>{book.name}</li>
                    ))}
                    {query !== '' && results.length === 0 && (
                        <div className="no-results">-- No results found --</div>
                    )}
                </ul>
            }
        </div>
    );
};

export default BookSearch;