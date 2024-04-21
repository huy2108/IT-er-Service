import React , {useState} from 'react'
import './AddProduct.css'
import axios from'axios'

export const AddProduct = () => {

  const [bookCover, setBookCover] = useState()
  const [bookContent, setBookContent] = useState()
  const [bookDetails, setBookDetails] = useState({
    name: '',
    description: '',
    author: '',
    bookCover: '',
    bookContent: '',
    genre: ''
  })
  
  const handleSetBookDetails = (e) => {
    setBookDetails({
      ...bookDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleBookCover = (e) => {
    setBookCover(e.target.files[0])
  }

  const handleBookContent = (e) => {
    setBookContent(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const successMessage = document.getElementById('notification')
    const bookCoverValue = document.getElementById('bookCover')
    const bookContentValue = document.getElementById('bookContent')

    let formData = new FormData()
    formData.append('bookCover', bookCover)
    formData.append('bookContent', bookContent)

    axios.post('http://localhost:4000/book/upload', formData)
      .then(response => {
        const book = {
          ...bookDetails,
          bookCover: response.data.image_url.bookCover_url,
          bookContent: response.data.image_url.bookContent_url
        }
        console.log(book)
        
        return axios.post('http://localhost:4000/book/addbook', book)
      })
      .then(response => {
        console.log(response.data)
        successMessage.style.display = 'block'
        setBookDetails({
          name: '',
          description: '',
          author: '',
          bookCover: '',
          bookContent: '',
          genre: ''
        })
        bookCoverValue.value = null
        bookContentValue.value = null 
      })
      .catch(error => {
        console.log(error)
        alert('Failed to add a new book. Try again!')
      })
      .finally(() => {
        setTimeout(() => {
          successMessage.style.display = 'none'
        },3500)
      })
  }

  return (
    <>
      <div id="notification">Adding a new book successfully</div>
      <h1 className='title'>ADD A NEW PRODUCT </h1>
      <form onSubmit={handleSubmit} className='addProductForm'>
        <div className='input-text'>
          <h2>Name</h2>        
          <input value={bookDetails.name} onChange={(e) => handleSetBookDetails(e)} type="text" name='name' id='name' placeholder='Enter a name of a book' required/>
        </div>
        <div className='input-text'>
          <h2>Description</h2>
          <input value={bookDetails.description} onChange={(e) => handleSetBookDetails(e)} type="text" name='description' id='description' placeholder='Enter a description of a book' required/>
        </div>
        <div className='input-text'>
          <h2>Author</h2>
          <input value={bookDetails.author} onChange={(e) => handleSetBookDetails(e)} type="text" name='author' id='author' placeholder='Enter an author of a book' required/>
        </div>
        <div className='input-text'>
          <h2>Genre</h2>
          <input value={bookDetails.genre} onChange={(e) => handleSetBookDetails(e)} type="text" name='genre' id='genre' placeholder='Enter a genre' required/>
        </div>
        <div className='input-file'>
          <label htmlFor="bookCover">Book Cover</label>      
          <input onChange={handleBookCover} type="file" name='bookCover' id='bookCover' required/>
        </div>
        <div className='input-file'>
          <label htmlFor="bookContent">Book Content</label>
          <input onChange={handleBookContent} type="file" name='bookContent' id='bookContent' required/>
        </div>        
        <button>Submit</button>
      </form>
    </>
  )
}
