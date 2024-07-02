import React, { useState, useEffect } from 'react'
import './QuestionApproval.css'
import axios from 'axios'
import tick from '../../Components/Assets/tick.png'
import cross from '../../Components/Assets/cross.png'

export const QuestionApproval = () => {

    const [allQuestions, setAllQuestions] = useState()
    const [state, setState] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:4000/forum/getAllQuestions')
            .then(res => {
                console.log(res.data)
                setAllQuestions(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [state])

    const handleApprovalDisapprovalAction = (user, status) => {

        const approveModal = document.getElementById('approveModal')
        const disproveModal = document.getElementById('disproveModal')

        axios.patch('http://localhost:4000/forum/approveDisprove', {
            id: user,
            status // 'accepted' or 'rejected'
        })
            .then(res => {
                console.log(res);
                setState(!state)

                if (status === 'accepted') {
                    approveModal.style.display = 'flex'
                    setTimeout(() => {
                        approveModal.style.animation = 'slideDownOut 0.5s ease forwards'
                    }, 3000)

                    setTimeout(() => {
                        approveModal.style.animation = 'slideDown 0.5s ease forwards'
                        approveModal.style.display = 'none'
                    }, 4000)
                }
                else if (status === 'rejected') {
                    disproveModal.style.display = 'flex'
                    setTimeout(() => {
                        disproveModal.style.animation = 'slideDownOut 0.5s ease forwards'
                    }, 3000)

                    setTimeout(() => {
                        disproveModal.style.animation = 'slideDown 0.5s ease forwards'
                        disproveModal.style.display = 'none'
                    }, 4000)
                }

            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div className='questionApprovalContainer'>
            <p id='approveModal'>Successfully approve the question</p>
            <p id='disproveModal'>Sucessfully disprove the question</p>
            <h1 className='questionApprovalTitle'>Question Approval</h1>
            <div className="questionApprovalTable">
                {allQuestions &&
                    allQuestions.map((question, index) => {
                        return (
                            <div key={index} className='questionOverall'>
                                <p className='questionTitle'>{question.title}</p>
                                <p className='content'>{question.content}</p>
                                <div className="approveDeclineButton">
                                    <img onClick={() => handleApprovalDisapprovalAction(question._id, 'accepted')} src={tick} alt="" />
                                    <img onClick={() => handleApprovalDisapprovalAction(question._id, 'rejected')} src={cross} alt="" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
