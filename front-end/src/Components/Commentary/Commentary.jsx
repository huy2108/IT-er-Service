import React, { useEffect, useState } from 'react'
import './Commentary.css'
import axios from 'axios'
import StarRating from '../StarRating/StarRating'
import { CommentForm } from '../CommentForm/CommentForm'
import { HonrizontalBarRating } from '../HorizontalBarRating'
import userIcon from '../Assets/userIcon.png'
import { ArrowDirection } from '../ArrowDirection/ArrowDirection'

export const Commentary = (props) => {

  const [rating, setRating] = useState(0);
  const [choseRating, setChoseRating] = useState(0);
  const [content, setContent] = useState("")
  const [allComments, setAllComments] = useState([])
  const [averageRating, setAverageRating] = useState(0);
  const [length, setLength] = useState(0)
  const [state, setState] = useState(true)
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0])
  const [user, setUser] = useState({})
  const [editState, setEditState] = useState(false)
  const [name, setName] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    if (props.book) {
      const token = localStorage.getItem('token')
      var user;
      const book = props.book._id

      axios.get('http://localhost:4000/commentary/allCommentsStar', {
        params: {
          bookId: props.book._id
        }
      })
        .then(res => {
          console.log(res.data)
          setLength(res.data.length)
          calculateAverageRating(res.data);
          calculateStar(res.data)
        })
        .catch(err => {
          console.log(err)
          calculateAverageRating();
          calculateStar()
          setLength(0)
        })


      axios.get('http://localhost:4000/commentary/allComments', {
        params: {
          bookId: props.book._id
        }
      })
        .then(res => {
          setAllComments(res.data)
        })
        .catch(err => {
          console.log(err)
        })


      axios.get('http://localhost:4000/commentary/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          user = res.data.user.userId

          return axios.get('http://localhost:4000/commentary/findUser', {
            params: {
              book,
              commenter: user
            }
          })
        })
        .then(res => {
          if (res) {
            setUser(res.data)
            setState(false)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }


  }, [editState])

  console.log(user)
  // console.log(name)

  useEffect(() => {

    if (props.book) {
      const token = localStorage.getItem('token')
      var user;
      const book = props.book._id

      axios.get('http://localhost:4000/commentary/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          user = res.data.user.userId

          return axios.get('http://localhost:4000/commentary/findUser', {
            params: {
              book,
              commenter: user
            }
          })
        })
        .then(res => {
          if (res) {
            setUser(res.data)
            setState(false)
          }
        })
        .catch(err => {
          console.log(err)
        })

    }

  }, [props.book])

  useEffect(() => {

    if (props.book) {
      axios.get('http://localhost:4000/commentary/allComments', {
        params: {
          bookId: props.book._id
        }
      })
        .then(res => {
          setAllComments(res.data)
        })
        .catch(err => {
          console.log(err)
        })


      axios.get('http://localhost:4000/commentary/allCommentsStar', {
        params: {
          bookId: props.book._id
        }
      })
        .then(res => {
          setLength(res.data.length)
          calculateAverageRating(res.data);
          calculateStar(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [props.book])

  useEffect(() => {
    if (props.book) {

      calculateSetName(allComments)

      axios.get('http://localhost:4000/commentary/allCommentsStar', {
        params: {
          bookId: props.book._id
        }
      })
        .then(res => {
          // console.log(res.data)
          setLength(res.data.length)
          calculateAverageRating(res.data);
          calculateStar(res.data)
        })
        .catch(err => {
          console.log(err)
        })


    }
  }, [allComments])

  const calculateSetName = data => {

    var newName = data;
    // console.log(newName)

    newName.forEach(object => {
      axios.get('http://localhost:4000/api/findUser', {
        params: {
          id: object.commenter
        }
      })
        .then(res => {
          // newName.push(res.data)
          object.fullname = res.data
          setName(newName)
        })
        .catch(err => {
          console.log(err)
        })

    })

  }

  // console.log(name)

  const handleCommentary = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    var user;
    const book = props.book._id

    if (token) {

      axios.get('http://localhost:4000/commentary/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          user = res.data.user.userId
          if (choseRating !== 0) {
            return axios.post('http://localhost:4000/commentary/add', { commenter: user, book, content, star: choseRating })
          } else {
            return axios.post('http://localhost:4000/commentary/add', { commenter: user, book, content })
          }
        })
        .then(res => {
          // console.log(res.data)
          const newComment = res.data
          setChoseRating(0)
          setContent("")
          setAllComments(prevComments => [newComment, ...prevComments])

          setState(false)
          setEditState(!editState)

        })
        .catch(err => {
          console.log(err)
          alert(err.response.data.message)
        })

    }
  }

  // console.log(allComments)

  const calculateStar = (data) => {
    if (data) {
      const length = data.length;
      const newRatings = []; // Initialize a new array to store ratings

      for (let i = 1; i <= 5; i++) {
        let count = 0;
        data.forEach(object => {
          if (object.star === i) {
            count += 1;
          }
        });
        newRatings.push(count / length); // Use push to add elements to the array
      }

      setRatings(newRatings); // Update the state with the new ratings array
    }
    else {
      setRatings([0, 0, 0, 0, 0])
    }
  };

  // console.log(ratings)


  const calculateAverageRating = (comments) => {
    if (comments) {
      const totalStars = comments.reduce((acc, comment) => {
        if (comment.star) {
          return acc + comment.star;
        }
        return acc; // Return accumulator unchanged if comment has no star
      }, 0);

      const length = comments.length
      const average = (totalStars / length).toFixed(1);

      setAverageRating(average);
    } else {
      setAverageRating(0)
    }
  };

  // const handleStarHover = (index) => {
  //   setRating(index + 1);
  // };

  // const handleStarClick = (index) => {
  //   // Set rating in state or send to server
  //   setChoseRating(index + 1)
  // };

  // const handleMouseOut = () => {
  //   setRating(choseRating)
  // }

  // const handleCommentary = (e) => {
  //   e.preventDefault()
  //   const token = localStorage.getItem('token')
  //   var user;
  //   const book = props.book._id

  //   if (token) {

  //     axios.get('http://localhost:4000/commentary/verify', { headers: { Authorization: `Bearer ${token}` } })
  //       .then(res => {
  //         user = res.data.user.userId
  //         if (choseRating !== 0) {
  //           return axios.post('http://localhost:4000/commentary/add', { commenter: user, book, content, star: choseRating })
  //         } else {
  //           return axios.post('http://localhost:4000/commentary/add', { commenter: user, book, content })
  //         }
  //       })
  //       .then(res => {
  //         // console.log(res.data)
  //         const newComment = res.data
  //         setChoseRating(0)
  //         setContent("")
  //         setAllComments(prevComments => [newComment, ...prevComments])

  //         setState(false)

  //       })
  //       .catch(err => {
  //         console.log(err)
  //         alert(err.response.data.message)
  //       })

  //   }
  // }

  const handleEditReview = () => {
    const curtain = document.getElementById('readingFeatureCurtain')
    const editForm = document.getElementById('editForm')

    editForm.style.display = 'block'
    curtain.style.display = 'block'

    setContent(user.content)
    setRating(user.star)
    setChoseRating(user.star)
  }

  const handleCloseEditForm = (data) => {
    const curtain = document.getElementById('readingFeatureCurtain')
    const editForm = document.getElementById('editForm')

    if (editForm || curtain) {
      editForm.style.display = 'none'
      curtain.style.display = 'none'
    }

    setUser(data)
  }

  const handleEditForm = (e) => {
    e.preventDefault()
    if (content !== user.content || choseRating !== user.star) {
      axios.patch('http://localhost:4000/commentary/updateComment', { commenter: user.commenter, book: user.book, content, star: choseRating })
        .then(response => {
          console.log('Update successful:', response.data);
          setEditState(!editState)
          handleCloseEditForm(response.data)
        })
        .catch(error => {
          console.error('Error updating the commentary:', error);
        });

    } else {
      alert('You have not changed anything')
    }
  }

  const handleDeleteComment = () => {
    axios.delete('http://localhost:4000/commentary/deleteComment', {
      params: {
        userId: user._id
      }
    })
      .then(response => {
        // console.log(user)
        console.log(response)
        const curtain = document.getElementById('readingFeatureCurtain')
        const editForm = document.getElementById('editForm')

        if (editForm || curtain) {
          editForm.style.display = 'none'
          curtain.style.display = 'none'
        }
        setEditState(!editState)
        setState(true)

        setContent('')
        setRating(0)
        setChoseRating(0)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='commentContainer'>
      <div className="editForm" id='editForm'>
        <CommentForm
          setContent={setContent}
          content={content}
          rating={rating}
          choseRating={choseRating}
          setRating={setRating}
          setChoseRating={setChoseRating}
          handleAction={handleEditForm}
          handleDelete={handleDeleteComment}
        />
      </div>
      <h1 className='title'>Your Feeling</h1>
      <div className="graph">
        <div className="line">
          <h2>Reader Reviews</h2>
          <HonrizontalBarRating data={ratings} />
        </div>
        <div className="average">
          <h2>{averageRating}</h2>
          <p>Average from {length} Reviews</p>
          <StarRating rating={averageRating} />
        </div>
      </div>
      <div className="commentParent">
        {state &&
          <CommentForm
            setContent={setContent}
            content={content}
            rating={rating}
            handleAction={handleCommentary}
            setChoseRating={setChoseRating}
            setRating={setRating}
            choseRating={choseRating}
            adjust="margin-bottom"
          />
          // <form onSubmit={handleCommentary} className="commentForm">

          //   <div className="star-rating" id='star-rating'>
          //     {[...Array(5)].map((_, index) => (
          //       <span
          //         key={index}
          //         className={index < rating ? 'star active' : 'star'}
          //         onMouseOver={() => handleStarHover(index)}
          //         onMouseOut={handleMouseOut}
          //         onClick={() => handleStarClick(index)}
          //       >
          //         &#9733;
          //       </span>
          //     ))}
          //   </div>

          //   <div className="comment">
          //     <textarea value={content} onChange={(e) => setContent(e.target.value)} name="commentContent" id="commentContent" required />
          //     <button id='commentButton'>Save</button>

          //   </div>
          // </form>
        }
        {!state &&
          <div className='commentForm'>
            <div className="comment editComment">
              <button onClick={handleEditReview}>Edit Review</button>
            </div>
          </div>
        }
        <ArrowDirection
          amount={1}
          setCurrentIndex={setCurrentIndex}
          length={name ? name.length : 0}
          currentIndex={currentIndex}
        />
        <div className="comments">
          {name.slice(currentIndex, currentIndex + 1).map((comment, index) => {
            return (
              <div key={index} className='userComment'>
                <div className="userCommentChild">
                  <div className="userIcon">
                    <img src={userIcon} alt="userIcon" />
                  </div>
                  <div className="userFeeling">
                    {comment.fullname &&
                      <>
                        <p>{comment.fullname.firstname} {comment.fullname.lastname}</p>
                        <div>
                          {comment.star &&

                            <StarRating rating={comment.star} emptyColor={'emptyColor'} />
                          }
                        </div>
                      </>
                    }
                  </div>
                </div>
                <p className="userText">{comment.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}
