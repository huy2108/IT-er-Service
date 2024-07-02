import React, { useEffect, useState } from 'react'
import './ViewUser.css'
import axios from 'axios'
import edit from '../../Components/Assets/edit.png'
import editBlue from '../../Components/Assets/editBlue.png'
import { Curtain } from '../../Components/Curtain/Curtain'

export const ViewUser = () => {

    const [user, setUser] = useState()
    const [editImg, setEdit] = useState(true)
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [state, setState] = useState(true)

    useEffect(() => {
        const passwordForm = document.getElementById('changePasswordForm')

        passwordForm.style.display = 'none'
    }, [])

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            axios.get('http://localhost:4000/api/verifyViewUser', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    const id = res.data.user
                    // console.log(id)
                    return axios.get('http://localhost:4000/api/findUserViewUser', {
                        params: {
                            id
                        }
                    })
                })
                .then(res => {
                    const user = res.data
                    setUser(user)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }, [state])

    useEffect(() => {
        if (user) {
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setUserName(user.username)
            // setPassword(user.password)
        }
    }, [user])

    useEffect(() => {
        const inputs = document.getElementsByClassName('user-info');
        const fName = document.getElementById('profile-firstname')

        if (editImg === false) {

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.backgroundColor = 'white';
                inputs[i].removeAttribute('readonly')

            }
            if (fName) {

                fName.focus()
            }

        } else {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.backgroundColor = '#b6b6b6';
                inputs[i].setAttribute('readonly', true)

            }
        }
    }, [editImg])

    const handleEdit = () => {

        const userModal = document.getElementById('userModal')


        if (editImg === false) {

            if (firstname !== user.firstname || lastname !== user.lastname || username !== user.username) {
                axios.put('http://localhost:4000/api/editUser', {
                    id: user._id,
                    firstname,
                    lastname,
                    username,
                })
                    .then(res => {
                        // console.log(res)
                        userModal.style.display = 'flex'

                        setTimeout(() => {
                            userModal.style.animation = 'slideDownOut 0.5s ease forwards'
                        }, 3000)

                        setTimeout(() => {
                            userModal.style.display = 'none'
                            userModal.style.animation = 'slideDown 0.5s ease forwards'
                        }, 4000)

                        setState(!state)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

        setEdit(!editImg)
    }

    const handleChangePassword = () => {
        const curtain = document.getElementById('readingFeatureCurtain')
        const changePasswordForm = document.getElementById('changePasswordForm')

        setPassword('')
        setNewPassword('')
        setConfirmPassword('')

        setEdit(true)
        setFirstName(user.firstname)
        setLastName(user.lastname)
        setUserName(user.username)

        changePasswordForm.style.display = 'block'
        curtain.style.display = 'block'
    }

    const handleClickPassword = (e) => {
        e.preventDefault()

        const curtain = document.getElementById('readingFeatureCurtain')
        const changePasswordForm = document.getElementById('changePasswordForm')
        const passwordModal = document.getElementById('passwordModal')

        if (newPassword !== confirmPassword || password === newPassword) {
            alert('There is a problem with your new password')
        }
        else {
            axios.put('http://localhost:4000/api/checkUser', {
                id: user._id,
                oldPassword: password,
                newPassword,
            })
                .then(res => {
                    console.log(res)
                    curtain.style.display = 'none'
                    changePasswordForm.style.display = 'none'
                    setState(!state)

                    passwordModal.style.display = 'flex'
                    setTimeout(() => {
                        passwordModal.style.animation = 'slideDownOut 0.5s ease forwards'
                    }, 3000)

                    setTimeout(() => {
                        passwordModal.style.animation = 'slideDown 0.5s ease forwards'
                        passwordModal.style.display = 'none'
                    }, 4000)

                    // setEdit(!editImg)

                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data)
                })
        }
    }

    return (
        <>
            <p id='passwordModal'>Change password successfully!</p>
            <p id='userModal'>Update infomation successfully!</p>
            <div className='viewUserContainer'>
                <Curtain element='changePasswordForm' />
                <form onSubmit={handleClickPassword} className="profile-item" id='changePasswordForm'>
                    <p className='title'>Enter your existing password</p>
                    <div>
                        <input onChange={e => setPassword(e.target.value)} value={password ? password : ''} type='password' />

                    </div>

                    <p className='title'>Entering your new password</p>
                    <div>
                        <input onChange={e => setNewPassword(e.target.value)} value={newPassword ? newPassword : ''} type='password' />

                    </div>

                    <p className='title'>Confirm your new password</p>
                    <div>
                        <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword ? confirmPassword : ''} type='password' />

                    </div>

                    <div className="handleButton">
                        <button>Change Password</button>
                    </div>
                </form>
                {user &&
                    <div className="profile">
                        <div className='profile-title'>
                            <h2>Profile</h2>
                            <img onClick={handleEdit} src={editImg ? edit : editBlue} alt="" />
                        </div>
                        <div className="profile-item">
                            <p className='title'>Firstname</p>
                            <div>
                                <input className='user-info' onChange={e => setFirstName(e.target.value)} value={firstname ? firstname : ''} readOnly id='profile-firstname' />

                            </div>
                        </div>
                        <div className="profile-item">
                            <p className='title'>Lastname</p>
                            <div>
                                <input className='user-info' onChange={e => setLastName(e.target.value)} value={lastname ? lastname : ''} readOnly id='profile-lastname' />

                            </div>
                        </div>
                        <div className="profile-item">
                            <p className='title'>Username</p>
                            <div>
                                <input className='user-info' onChange={e => setUserName(e.target.value)} value={username ? username : ''} readOnly id='profile-username' />

                            </div>
                        </div>
                        <div className="profile-item">
                            <p onClick={handleChangePassword}>Change password?</p>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}
