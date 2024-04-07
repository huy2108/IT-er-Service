import React, {useState, useRef} from 'react'
import '../../Components/Assets/register-image.jpg'
import './Register.css'
import eyeBlue from '../../Components/Assets/eyeBlue.png'
import eye from '../../Components/Assets/eye.png'
import axios from 'axios'


export const Register = () => {


    const [image, setImage] = useState('eye')
    const inputRef = useRef(null)
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');

        const TogglePassVisibility = () => {
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

        const handleChangUsername = value => {
            const username = document.getElementById('username')
            if(value && username.style.borderColor === 'red') username.style.borderColor = '#d8d8d8'

            setUsername(value)
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            const userName = document.getElementById('username')
            console.log(username)
            console.log(password)
            
            axios.post('http://localhost:4000/api/register', {firstname,lastname,username,password})
                .then(response => {
                    console.log(response.data)
                    window.location.replace('/login')
                })
                .catch(error => {
                    console.log(error)
                    alert("User already existed! Please choose another username.")
                    setUsername('')
                    userName.style.borderColor = 'red'
                    userName.focus()
                })
                
        }

  return (
    <>
        <div className='register-container'>
            <div className="curtain"></div>
            <form onSubmit={handleSubmit} action="/login" className="register-form">
                <h2>Sign Up</h2>
                <ul className="register-data-field">
                    <li>
                        <input value={firstname} onChange={e => setFirstname(e.target.value)} type="text" placeholder='First Name' name="firstname" id="firstname" maxLength={28} required/>
                    </li>
                    <li>
                        <input value={lastname} onChange={e => setLastname(e.target.value)} type="text" placeholder='Last Name' name="lastname" id="lastname" maxLength={28} required/>
                    </li>
                    <li>
                        <input value={username} onChange={e => handleChangUsername(e.target.value)} type="text" placeholder='Username' name="username" id="username" maxLength={28} required/>
                    </li>
                    <li>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' name="password" id="password" maxLength={28} required/>
                        <i ref={inputRef} className='eye' onClick={TogglePassVisibility}></i>
                    </li>
                </ul>
                <button className='register-submit'>Sign Up</button>
                <p className="direct-login">
                    Already a memeber?
                    <a href="/login"> Log in</a>
                </p>
            </form>
        </div>
    </>
  )
}

