import React from 'react'
import './BookDetails.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import xIcon from '../../Components/Assets/x_icon.png'
import { useParams } from 'react-router-dom'

export const BookDetails = () => {

  const { slug } = useParams();
  const [book, setBook] = useState()

  useEffect(() => {
    axios.get('http://localhost:4000/book/getABook',{
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
    
    window.scrollTo(0,0)

  },[slug])

  // console.log(book)

  const handleReading = () => {
    const curtain = document.getElementById('readingFeatureCurtain')
    const bookContent = document.getElementById('readingFeatureContent')
    
    curtain.style.display = 'block'
    bookContent.style.display = 'block'
  }

  const handleRemoveCurtain = () => {
    const curtain = document.getElementById('readingFeatureCurtain')
    const bookContent = document.getElementById('readingFeatureContent')

    curtain.style.display = 'none'
    bookContent.style.display = 'none'
  }

  return (
    <>
      <div className='bookDetailsContainer'>
        <div className="childContainer">
          <div className="bookImage">
            <img src={book ? book.bookCover : ''} alt="" />
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
          </div>
        </div>
      </div>
      <div className="bookContentCurtain" id='readingFeatureCurtain'>
        <img src={xIcon} alt="" onClick={handleRemoveCurtain}/>
      </div>
      <embed className='bookContent' id='readingFeatureContent' src={book ? book.bookContent: ''} type="application/pdf" />
    </>
  )
}
