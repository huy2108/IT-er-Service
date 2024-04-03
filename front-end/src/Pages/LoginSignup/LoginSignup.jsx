import React, {useRef, useState} from 'react'
import './login.css'
import eyeBlue from '../../Components/Assets/eyeBlue.png'
import eye from '../../Components/Assets/eye.png'
import axios from 'axios'


export const LoginSignup = () => {

  const [username, setUsername] = useState('')
  const [password, setPwd] = useState('')
  const [image, setImage] = useState('eye')
  const inputRef = useRef(null);

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

  const handleSubmit = () => {
    axios.get('http://localhost:4000/api/login',{username, password})
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('Login falied!', error.data.response)
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
        <form className="login-details">
          <div className="username">
            <label htmlFor="username">Username</label>
            <input type="text" onChange={e => setUsername(e.target.value)} placeholder='Enter your username' name="username" maxLength={20} id="username" required />
            <i className='lock'></i>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={e => setPwd(e.target.value)} placeholder='Enter your password' maxLength={25} name="password" id="password" required />
            <i ref={inputRef} className="eye-icon" onClick={togglePasswordVisibility}></i>
          </div>
          <button type='submit' onClick={handleSubmit}>Submit</button>
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
