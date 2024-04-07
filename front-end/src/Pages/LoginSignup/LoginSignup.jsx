import React, {useEffect, useRef, useState} from 'react'
import './login.css'
import eyeBlue from '../../Components/Assets/eyeBlue.png'
import eye from '../../Components/Assets/eye.png'
import axios from 'axios'


export const LoginSignup = ({setIsLoggedIn, setLoading}) => {

  const [username, setUsername] = useState('')
  const [password, setPwd] = useState('')
  const [image, setImage] = useState('eye')
  const inputRef = useRef(null);

  
  // useEffect(() => {
  //   setLoading(false)
  // },[])

  const togglePasswordVisibility = () =>{

    const passwordValue = document.getElementById('password')

    if(image === 'eyeblue'){
      inputRef.current.style.backgroundImage = `url(${eye})`
      inputRef.current.style.backgroundSize = '20px'
      passwordValue.type = 'password'
      setImage('eye')
    }
    else if(image === 'eye'){
      inputRef.current.style.backgroundImage = `url(${eyeBlue})`
      inputRef.current.style.backgroundSize = '29.5px'
      passwordValue.type = 'text'
      setImage('eyeblue')
    }
  }

  const handleChangeUsername = value => {
    const username = document.getElementById('username')
    if(value && username.style.borderColor === 'red') {
      username.style.borderColor = '#d8d8d8'
    }
    setUsername(value)
  }

  const handleChangePassword = value => {
    const password = document.getElementById('password')
    if(value && password.style.borderColor === 'red') {
      password.style.borderColor = '#d8d8d8'
    }
    setPwd(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/api/login',{username, password})
      .then(response => {
        const token = response.data.token
        console.log(token)
        localStorage.setItem('token', token)
        setIsLoggedIn(true)
      })
      .catch(error => {
        console.error("Login failed!", error)
        alert('Invalid username or password!')
        setUsername('')
        setPwd('')
        document.getElementById('username').style.borderColor = 'red'
        document.getElementById('password').style.borderColor = 'red'
        document.getElementById('username').focus()
      })
  }

  return (
    <div className='login-container'>
      {/* <img src={ebookImage} alt="" /> */}
      <h1>IT-er Service</h1>
      <div className="form">
        <h1 className="form-title">
          Sign in to Active
        </h1>
        <p>Enter your details below</p>
        <form className="login-details" id="form-login" onSubmit={handleSubmit} action='/'>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input value={username} type="text" onChange={e => handleChangeUsername(e.target.value)} placeholder='Enter your username' name="username" maxLength={20} id="username" required />
            <i className='lock'></i>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input value={password} type="password" onChange={e => handleChangePassword(e.target.value)} placeholder='Enter your password' maxLength={25} name="password" id="password" required />
            <i ref={inputRef} className="eye-icon" onClick={togglePasswordVisibility}></i>
          </div>
          <button type='submit'>Submit</button>
        </form>
        <div className="register-para">
            <p>
              Don't have an account?
              <a href="/register"> Signup</a>
            </p>
          </div>
      </div>
    </div>
  )
}
