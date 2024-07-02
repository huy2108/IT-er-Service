import React, { useState, useRef, useEffect } from 'react'
import './Forum.css'
import { Curtain } from '../../Components/Curtain/Curtain'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

export const Forum = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const forumContentRef = useRef(null)
  const [userId, setUserId] = useState()
  const [approvedQuestions, setApprovedQuestions] = useState()

  const navigate = useNavigate()

  useEffect(() => {

    if (approvedQuestions) {

      approvedQuestions.forEach(question => {

        axios.get('http://localhost:4000/api/findUser', {
          params: {
            id: question.user
          }
        })
          .then(res => {
            // console.log(res.data)
            const name = res.data
            question.name = name
            setApprovedQuestions(approvedQuestions)
          })
          .catch(err => {
            console.log(err)
          })

      })
    }

  }, [approvedQuestions])

  // console.log(approvedQuestions)

  useEffect(() => {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:4000/forum/getAllQuestionsApproved')
      .then(res => {
        setApprovedQuestions(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    if (token) {
      axios.get('http://localhost:4000/forum/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          const id = res.data._id
          setUserId(id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])


  const handleCurtainForum = () => {
    const curtain = document.getElementById('readingFeatureCurtain')
    const forumForm = document.getElementById('forumForm')

    forumForm.style.display = 'block'
    curtain.style.display = 'block'

    forumContentRef.current.style.height = 'auto'

    setTitle('')
    setContent('')
  }

  const handleSubmitForum = (e) => {
    e.preventDefault()

    const curtain = document.getElementById('readingFeatureCurtain')
    const forumForm = document.getElementById('forumForm')
    const forumModal = document.getElementById('forumModal')

    axios.post('http://localhost:4000/forum/publishQuestion', {
      title,
      content,
      userId
    })
      .then(res => {
        // console.log(res)

        forumModal.style.display = 'flex'
        setTimeout(() => {
          forumModal.style.animation = 'slideDownOut 0.5s ease forwards'
        }, 3000)

        setTimeout(() => {
          forumModal.style.animation = 'slideDown 0.5s ease forwards'
          forumModal.style.display = 'none'
        }, 4000)

        curtain.style.display = 'none'
        forumForm.style.display = 'none'
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <div className='forumContainer'>
      <p id='forumModal'>Successfully create a new question. Please wait for your question to be approved</p>
      <div className="forumHero">
        <div className="curtainForumImage">
        </div>
        <div className="forumTitle">ANYTHING TO ASK?</div>
      </div>
      <div className="forumTable">
        <div className="forumTableTitle">
          <p className="forumTableTitleItem">
            TITLE
          </p>
          <p className="forumTableTitleItem">
            AUTHOR
          </p>
          <p className="forumTableTitleItem">
            COMMENTS
          </p>
          <p className="forumTableTitleItem">
            DATE
          </p>
        </div>
        {approvedQuestions &&
          approvedQuestions.map((question, index) => {
            return (
              <Link to={`/forum/${question.slug}`} key={index} className='question forumTableTitle'>
                <p className='forumTableContentItem forumTableTitleItem item1'>
                  {question.title}
                </p>
                <p className='forumTableContentItem forumTableTitleItem '>
                  {question.name &&
                    question.name.lastname + ' ' + question.name.firstname
                  }
                </p>
                <p className='forumTableContentItem forumTableTitleItem item2'>{question.comments.length}</p>
                <p className='forumTableContentItem forumTableTitleItem '>
                  {new Date(question.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>
              </Link>
            )
          })
        }
      </div>

      <div onClick={handleCurtainForum} className='addQuestionIcon'>
        <div className="addQuestionCurtain"></div>
      </div>

      <Curtain element='forumForm' />

      <form onSubmit={handleSubmitForum} className="forumForm" id='forumForm'>
        <div className='forumFormItem'>
          <p>Title</p>
          <input onChange={e => setTitle(e.target.value)} value={title} type="text" required />
        </div>
        <div className='forumFormItem1'>
          <p>Content</p>
          <textarea ref={forumContentRef} onChange={e => setContent(e.target.value)} value={content} name="" id="" required></textarea>
        </div>
        <div className='forumSubmit'>
          <button>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}
