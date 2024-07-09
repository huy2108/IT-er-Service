import React from 'react'
import './BookDetails.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Curtain } from '../../Components/Curtain/Curtain'
import { useParams } from 'react-router-dom'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import fb from '../../Components/Assets/facebook.png'
import twitter from '../../Components/Assets/twitter.png'
import linkedin from '../../Components/Assets/linkedinBlue.png'
import { saveAs } from 'file-saver';
// import * as Icon from 'react-feather';
// import { Link } from 'react-router-dom'
import { Commentary } from '../../Components/Commentary/Commentary'
import { BookChain } from '../../Components/BookChain/BookChain'

export const BookDetails = () => {

  const { slug } = useParams();
  const [book, setBook] = useState()
  const [allBooks, setAllBooks] = useState()
  const [sameGenreBook, setSameGenreBook] = useState()
  // const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    axios.get('http://localhost:4000/book/getABook', {
      params: {
        slug
      }
    })
      .then(res => {
        setBook(res.data.book)
      })
      .catch(err => {
        console.log(err)
      })

    window.scrollTo(0, 0)

  }, [slug])

  useEffect(() => {

    if (book) {
      axios.get('http://localhost:4000/book/allbooks')
        .then(response => {
          var books = response.data
          books = books.filter(item => item._id !== book._id)
          setAllBooks(books)
        })
        .catch(err => {
          console.log(err)
        })



      axios.get('http://localhost:4000/book/getGenre', {
        params: {
          genre: book.genre
        }
      })
        .then(res => {
          var books = res.data
          books = books.filter(item => item._id !== book._id)
          setSameGenreBook(books)
        })
        .catch(err => {
          console.log(err)
        })
    }


  }, [book])



  const handleReading = () => {
    const curtain = document.getElementById('readingFeatureCurtain')
    const bookContent = document.getElementById('readingFeatureContent')

    curtain.style.display = 'block'
    bookContent.style.display = 'block'
  }


  // console.log(book.bookContent)

  const handleDownload = () => {
    if (book) {
      // Assuming book.bookContent is a URL string to the PDF file
      fetch(book.bookContent)
        .then(response => response.blob())
        .then(blob => {
          // Trigger the file download
          saveAs(blob, `${encodeURIComponent(book.name)}.pdf`);
        })
        .catch(error => {
          console.error('Error downloading PDF:', error);
        });
    }
  };


  return (
    <div className='backgroundLib'>
      <div className='bookDetailsContainer'>
        <div className="childContainer">
          <div className="bookImage">
            <img src={book ? book.bookCover : ''} alt="" />
            <div className="shareBtnContainer">
              <TwitterShareButton className='shareBtn' url={book ? book.bookContent : ''} quote={book ? book.bookCover : ''}>
                <img src={twitter} alt="" />
              </TwitterShareButton>
              <FacebookShareButton className='shareBtn' url={book ? book.bookContent : ''} quote={book ? book.bookCover : ''}>
                <img src={fb} alt="" />
              </FacebookShareButton>
              <LinkedinShareButton className='shareBtn' url={book ? book.bookContent : ''} quote={book ? book.bookCover : ''}>
                <img src={linkedin} alt="" />
              </LinkedinShareButton>
            </div>
          </div>
          <div className="bookInfo">
            <h2 className='bookName'>{book ? book.name : ''}</h2>
            <p className="bookAuthor">
              {book ? book.author : ''}
            </p>
            <p className="bookDescription">
              {book ? book.description : ''}
            </p>
            <button onClick={handleReading} className="readingButton">
              Reading
            </button>
            <button className='downloadButton' onClick={handleDownload}>Download PDF</button>
          </div>
        </div>
      </div>
      <Curtain element='readingFeatureContent' />
      <embed className='bookContent' id='readingFeatureContent' src={book ? book.bookContent : ''} type="application/pdf" />
      <BookChain books={sameGenreBook} amount={5} header='Relating Books' />

      <Commentary book={book} />

      <BookChain books={allBooks} amount={5} header='Other Books' />
    </div>
  )
}
