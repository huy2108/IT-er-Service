import React, { useEffect, useState } from 'react';
import './HeroLib.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookSearch from '../SearchBar/BookSearch';
import { ArrowDirection } from '../ArrowDirection/ArrowDirection';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const HeroLib = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [stateBook, setStateBook] = useState(false);
    const [allGenres, setAllGenres] = useState([]);
    const [stateGenre, setStateGenre] = useState(false);
    const [category, setCategory] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [state, setState] = useState(true)

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    useEffect(() => {
        axios.get('http://localhost:4000/book/allbooks')
            .then(res => {
                setAllBooks(res.data)
                setCurrentIndex(0)
            })
            .finally(() => {
                setCategory('')
            })
    }, [state])

    useEffect(() => {
        axios.get('http://localhost:4000/book/getAllGenres')
            .then(response => {
                setAllGenres(response.data);
                setStateGenre(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const fetchBooks = category === ''
            ? axios.get('http://localhost:4000/book/allbooks')
            : axios.get('http://localhost:4000/book/getGenre', { params: { genre: category } });

        fetchBooks.then(response => {
            setAllBooks(response.data);
            setStateBook(true);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [category]);

    const handleMouseEnter = () => {
        const curtain = document.querySelector('.curtain');
        const heroTitle = document.querySelector('.hero-title');
        curtain.classList.add('fadeIn');
        curtain.addEventListener('animationend', () => {
            setTimeout(() => heroTitle.classList.add('fadeInText'), 1000);
        }, { once: true });
    }

    const handleMouseLeave = () => {
        const curtain = document.querySelector('.curtain');
        const heroTitle = document.querySelector('.hero-title');
        curtain.classList.remove('fadeIn');
        heroTitle.classList.remove('fadeInText');
    };

    const handleCheckbox = value => {
        setCurrentIndex(0)
        setCategory(value === category ? '' : value);
    }
    // console.log(allBooks)

    return (
        <div className='libraryContainer'>
            <div className='hero-image'>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="curtain">
                    <h1 className='hero-title'>Window To The World</h1>
                </div>
            </div>
            <div className="library-feature">
                <h1 id='library-title'>LIBRARY</h1>
                <div className="books-container">
                    <div className="searchbar">
                        <BookSearch allBooks={allBooks} setAllBooks={setAllBooks} />
                    </div>
                    <div className="books-library">
                        <div className="bookshelfParent">
                            <div className="categories">
                                <h2>GENRE</h2>
                                {stateGenre && allGenres.map(genre => (
                                    <div key={genre} className="custom-checkbox category">
                                        <input
                                            type="checkbox"
                                            checked={category === genre}
                                            value={genre}
                                            name={genre}
                                            id={genre}
                                            onChange={e => handleCheckbox(e.target.value)}
                                        />
                                        <label htmlFor={genre}>{genre}</label>
                                    </div>
                                ))}

                            </div>
                            <div className="bookcase" id='bookcase'>
                                <h2>{category ? `${category} Books` : 'All Books'}</h2>
                                <p onClick={() => setState(!state)} className='seeAllBooksFunction'>See All Books</p>

                                {stateBook && allBooks.slice(currentIndex, currentIndex + 6).map(book => (
                                    <Link key={book.name} className="book" to={`${book.slug}`}>
                                        <motion.div
                                            ref={ref}
                                            initial="hidden"
                                            animate={inView ? "visible" : "hidden"}
                                            variants={containerVariants}
                                            className="book-list"
                                        >
                                            <img src={book.bookCover} alt="Book Cover" className="book-image" />
                                            <p>{book.name}</p>
                                        </motion.div>
                                    </Link>
                                ))}

                            </div>
                        </div>
                        <div className="arrow-library">
                            <ArrowDirection
                                amount={6}
                                setCurrentIndex={setCurrentIndex}
                                currentIndex={currentIndex}
                                length={allBooks ? allBooks.length : 0}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}
