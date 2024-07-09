import React, { useState, useEffect } from 'react'
import './YourConcern.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const YourConcern = () => {

    const [allQuestions, setAllQuestions] = useState()

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
            axios.get('http://localhost:4000/api/verifyViewUser', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    const id = res.data.user
                    // console.log(id)
                    return axios.get('http://localhost:4000/forum/getAllQuestionsApprovedByUser', {
                        params: {
                            user: id
                        }
                    })
                })
                .then(res => {
                    // console.log(res)
                    setAllQuestions(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }, [])

    console.log(allQuestions)

    return (
        <div className='yourConcernContainer'>
            <h1>Your Concern</h1>
            <div className='yourQuestionsContainer'>
                {allQuestions && allQuestions.length > 0 ?
                    allQuestions.map((question, index) => {
                        return (
                            <motion.div
                                key={index}
                                ref={ref}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={containerVariants}// Animation duration
                            >
                                <Link to={`/forum/${question.slug}`} key={index} className='ownQuestionContainer'>
                                    <p>{question.title}</p>
                                    <p className="date">
                                        {new Date(question.createdAt).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </Link>
                            </motion.div>
                        )
                    })
                    : <p className='noQuestionNotification'>You've not posted any questions or your questions have not been approved yet!</p>
                }
            </div>
        </div>
    )
}
