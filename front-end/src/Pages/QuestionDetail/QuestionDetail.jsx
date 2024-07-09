import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './QuestionDetail.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import like from '../../Components/Assets/like.png'
import likeBlue from '../../Components/Assets/likeBlue.png'
import commentIcon from '../../Components/Assets/comment.png'
import send from '../../Components/Assets/send.png'
import { ArrowDirection } from '../../Components/ArrowDirection/ArrowDirection';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


export const QuestionDetail = () => {

    const { slug } = useParams()
    const [question, setQuestion] = useState()
    const likeRef = useRef(null)
    const [user, setUser] = useState()
    const likeIconRef = useRef()
    const [postUser, setPostUser] = useState()
    const [hasLiked, setHasLiked] = useState(false)
    const [commentToggle, setCommentToggle] = useState(false)
    const [comment, setComment] = useState()
    const [allComments, setAllComments] = useState()
    const [state, setState] = useState()
    const [allCommentsComprehensive, setAllCommentsComprehensive] = useState()
    const [currentIndex, setCurrentIndex] = useState(0)

    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.1,
    })

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            axios.get('http://localhost:4000/api/verifyQuestionUser', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    const id = res.data.user
                    return axios.get('http://localhost:4000/api/findUserViewUser', {
                        params: {
                            id
                        }
                    })
                })
                .then(res => {
                    const user1 = res.data
                    setUser(user1)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        axios.get('http://localhost:4000/forum/getAQuestion', {
            params: {
                slug
            }
        })
            .then(res => {
                setQuestion(res.data)
            })
            .catch(err => {
                console.log(err)
            })


        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds smooth scrolling
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/forum/getAQuestion', {
            params: {
                slug
            }
        })
            .then(res => {
                setQuestion(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [state])

    useEffect(() => {

        if (question && user) {
            axios.get('http://localhost:4000/api/findUser', {
                params: {
                    id: question.user
                }
            })
                .then(res => {
                    setPostUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            axios
                .post(
                    'http://localhost:4000/forum/checkLike',
                    { postId: question._id, userId: user._id }
                )
                .then(res => {
                    const { hasLiked } = res.data;
                    setHasLiked(hasLiked);
                })
                .catch(err => {
                    console.log('Error checking like:', err);
                });


        }




    }, [question, user])

    useEffect(() => {
        if (question) {
            axios.get('http://localhost:4000/forum/getAllComments', {
                params: {
                    postId: question._id
                }
            })
                .then(res => {
                    console.log(res.data)
                    setAllComments(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [question, state])

    // console.log(allComments)

    useEffect(() => {
        axios.get('http://localhost:4000/forum/getAQuestion', {
            params: {
                slug
            }
        })
            .then(res => {
                setQuestion(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [hasLiked])

    useEffect(() => {
        if (allComments) {
            const fetchUserPromises = allComments.map(comment => (
                axios.get('http://localhost:4000/api/findUser', {
                    params: {
                        id: comment.user
                    }
                }).then(res => res.data)
            ));

            Promise.all(fetchUserPromises)
                .then(users => {
                    const updatedComments = allComments.map((comment, index) => ({
                        ...comment,
                        name: users[index]
                    }));
                    setAllCommentsComprehensive(updatedComments);
                })
                .catch(err => {
                    console.log(err);
                    // Handle error if needed
                });
        }
    }, [allComments]);


    // console.log(allCommentsComprehensive)

    const handleLikeFunction = () => {
        // Toggle like functionality
        if (!hasLiked) {
            axios
                .post(
                    'http://localhost:4000/forum/addLike',
                    { postId: question._id, userId: user._id },
                )
                .then(res => {
                    likeRef.current.style.color = 'var(--blue-bright)';
                    if (likeIconRef !== null) {
                        likeIconRef.current.src = likeBlue;
                        likeIconRef.current.style.animation = 'likeAnimation 3s ease';
                        setTimeout(() => {
                            likeIconRef.current.style.animation = 'none';
                        }, 1000);
                    }
                    setHasLiked(true);

                })
                .catch(err => {
                    console.log('Error adding like:', err);
                });
        } else {
            axios
                .post(
                    'http://localhost:4000/forum/removeLike',
                    { postId: question._id, userId: user._id },
                )
                .then(res => {
                    likeRef.current.style.color = 'grey';
                    likeIconRef.current.src = like;
                    setHasLiked(false);
                })
                .catch(err => {
                    console.log('Error removing like:', err);
                });
        }
    }

    const handleToggleComment = () => {

        setComment('')
        setCommentToggle(!commentToggle)
    }

    const handleSendComment = () => {

        const commentForumModal = document.getElementById('commentForumModal')

        axios.post('http://localhost:4000/forumComment/add', {
            content: comment,
            user: user._id,
            postId: question._id
        })
            .then(res => {
                console.log(res)
                setComment('')
                setCommentToggle(!commentToggle)

                setState(!state)

                commentForumModal.style.display = 'flex'

                setTimeout(() => {
                    commentForumModal.style.animation = 'slideDownOut 0.5s ease forwards'
                }, 3000)

                setTimeout(() => {
                    commentForumModal.style.display = 'none'
                    commentForumModal.style.animation = 'slideDown 0.5s ease forwards'
                }, 4000)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLikeFunctionComment = (comment) => {
        if (!comment.likes.includes(user._id)) {
            axios
                .post(
                    'http://localhost:4000/forumComment/addLike',
                    { commentId: comment._id, userId: user._id },
                )
                .then(res => {

                    setState(!state)

                })
                .catch(err => {
                    console.log('Error adding like:', err);
                });
        } else {
            axios
                .post(
                    'http://localhost:4000/forumComment/removeLike',
                    { commentId: comment._id, userId: user._id },
                )
                .then(res => {

                    setState(!state)

                })
                .catch(err => {
                    console.log('Error removing like:', err);
                });
        }
    }

    return (
        <div className='questionContainer'>
            <p id="commentForumModal">
                Successfully add a new comment!
            </p>
            {question &&
                <div className="questionForm">
                    <h1 className='questionDetailTitle'>{question.title}</h1>
                    <div className='questionFormat'>
                        <div className='avatarUser'>
                            {postUser &&
                                <>
                                    <p className="avatarName">{postUser.lastname.charAt(0) + postUser.firstname.charAt(0)}</p>
                                    <p> {postUser.lastname + ' ' + postUser.firstname}</p>
                                </>
                            }

                        </div>
                        <p style={{ textDecoration: 'underline', fontStyle: 'italic', marginTop: '10px', fontSize: '16px' }}>Question:</p>
                        <p className="questionDetailContent">{question.content}</p>
                        <div className="questionJudgement">
                            <div onClick={handleLikeFunction} className="likeFunction">
                                <img
                                    ref={likeIconRef}
                                    src={hasLiked ? likeBlue : like}
                                    alt=''
                                />
                                <p
                                    ref={likeRef}
                                    style={{
                                        color: hasLiked ? 'var(--blue-bright)' : 'grey'
                                    }}
                                >
                                    Like {question && question.likes.length}
                                </p>
                            </div>
                            <div onClick={handleToggleComment} className="likeFunction commentFunction">
                                <img src={commentIcon} alt="" />
                                <p>Comment {question.comments.length}</p>
                            </div>
                        </div>
                        {commentToggle &&
                            <div className="commentInput">
                                <input type="text" onChange={e => setComment(e.target.value)} value={comment} id='commentForumInput' autoFocus placeholder='Enter your comment...' />
                                <img onClick={handleSendComment} src={send} alt="" />
                            </div>
                        }
                        <div className="userCommentsContainer">
                            {allCommentsComprehensive &&
                                allCommentsComprehensive.slice(currentIndex, currentIndex + 5).map((comment, index) => (
                                    <motion.div
                                        key={index}
                                        ref={ref}
                                        initial="hidden"
                                        animate={inView ? "visible" : "hidden"}
                                        variants={containerVariants}// Animation duration
                                    >
                                        <div className="userCommentsSpecific">
                                            <div key={comment._id} className="userComments">
                                                <div className='avatarUser avatarCommentUser'>
                                                    {comment && comment.name &&
                                                        <>
                                                            <p className="avatarName">{comment.name.lastname.charAt(0) + comment.name.firstname.charAt(0)}</p>
                                                            <p>{comment.name.lastname + ' ' + comment.name.firstname}</p>
                                                        </>
                                                    }
                                                </div>
                                                <p className="commentContent">
                                                    {comment && comment.content}
                                                </p>
                                                <p className='commentDate'>
                                                    {comment &&
                                                        new Date(comment.createdAt).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            <div className="userCommentsFunctions">
                                                <div className="questionJudgement commentQuestionJudgement">
                                                    <div onClick={() => handleLikeFunctionComment(comment)} className="likeFunction commentLikeFunction">
                                                        <img
                                                            // ref={likeIconRef}
                                                            src={comment.likes.includes(user._id) ? likeBlue : like}
                                                            alt=''
                                                        />
                                                        <p
                                                            // ref={likeRef}
                                                            style={{
                                                                color: comment.likes.includes(user._id) ? 'var(--blue-bright)' : 'grey'
                                                            }}
                                                        >
                                                            Like {comment && comment.likes.length}
                                                        </p>
                                                    </div>
                                                    {/* <div onClick={handleToggleComment} className="likeFunction commentFunction">
                                                    <img src={commentIcon} alt="" />
                                                    <p>Comment</p>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                        </div>
                        <div className="questionDetailsArrow">
                            <ArrowDirection
                                length={allCommentsComprehensive ? allCommentsComprehensive.length : 0}
                                amount={5}
                                setCurrentIndex={setCurrentIndex}
                                currentIndex={currentIndex}
                            />
                        </div>

                    </div>
                </div>
            }
        </div >
    )
}
