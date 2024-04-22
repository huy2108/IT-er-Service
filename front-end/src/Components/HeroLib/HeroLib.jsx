import React, {useEffect, useState} from 'react'
import './HeroLib.css'
import axios from 'axios'

export const HeroLib = () => {

    const [allBooks, setAllBooks] = useState()
    const [stateBook, setStateBook] = useState(false)
    const [allGenres, setAllGenres] = useState()
    const [stateGenre, setStateGenre] = useState(false)
    const [category, setCategory] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/book/getAllGenres')
            .then(response => {
                setAllGenres(response.data)
                setStateGenre(true)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if(category === ''){
            axios.get('http://localhost:4000/book/allbooks')
                .then(response => {
                    setAllBooks(response.data)
                    setStateBook(true)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            axios.get('http://localhost:4000/book/getGenre', {
                params: {
                    genre: category
                }
            })
            .then(response => {
                setAllBooks(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    },[category])

    // console.log(allBooks)

    const handleMouseEnter = () => {
        const curtain = document.querySelector('.curtain')
        const heroTitle = document.querySelector('.hero-title')
        curtain.classList.add('fadeIn')

        const onAnimationEnd = () => {
            setTimeout(() => {
                heroTitle.classList.add('fadeInText')
            },1000)
            curtain.removeEventListener('animationend', onAnimationEnd);
        };

         curtain.addEventListener('animationend', onAnimationEnd);
    }

    const handleMouseLeave = () => {
        const curtain = document.querySelector('.curtain');
        const heroTitle = document.querySelector('.hero-title')
        curtain.classList.remove('fadeIn');
        heroTitle.classList.remove('fadeInText')
        
    };

    const handleCheckbox = value => {
        if(value === category){
            setCategory('')
        }else{
            setCategory(value)
        }
    }

  return (
    <>
        <div className='hero-image'>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="curtain" >
                <h1 className='hero-title'>Window To The World</h1>
            </div>
        </div>
        <div className="library-feature">
            <h1>LIBRARY</h1>
            <div className="books-container">
                <div className="categories">
                    <h2>GENRE</h2>
                    {stateGenre && 
                        allGenres.map(genre => {
                            return(
                                <div key={genre} className="category">
                                    <input 
                                        type="checkbox" 
                                        checked={category === genre}
                                        value={genre} 
                                        name={genre} 
                                        id={genre} 
                                        onChange={e => handleCheckbox(e.target.value)}
                                    />
                                    <p>{genre}</p>
                                </div>
                            )
                    })}
                </div>
                <div className="bookcase">
                    <h2>{category} Books</h2>
                    {stateBook &&
                        allBooks.map(book => {
                            return(
                                <div key={book.name} className="book">
                                    <img src={book.bookCover} alt="Book Cover" />
                                    <p>{book.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    </>
  )
}
