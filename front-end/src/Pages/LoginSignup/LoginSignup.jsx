import React, {useRef, useState} from 'react'
import ebookImage from '../../Components/Assets/Login-image.jpg'
import './login.css'
import eyeBlue from '../../Components/Assets/eyeBlue.png'
import eye from '../../Components/Assets/eye.png'

export const LoginSignup = () => {

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


  return (
    <div className='login-container'>
      <img src={ebookImage} alt="" />
      <h1>IT-er Service</h1>
      <div className="form">
        <h1 className="form-title">
          Sign in to Active
        </h1>
        <p>Enter your details below</p>
        <form className="login-details">
          <div className="username">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Enter your username' name="username" maxLength={20} id="username" required />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter your password' maxLength={25} name="password" id="password" required />
            <i ref={inputRef} className="eye-icon" onClick={togglePasswordVisibility}></i>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
