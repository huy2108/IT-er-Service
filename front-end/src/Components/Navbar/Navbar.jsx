import React, { useEffect, useContext } from 'react'
import './Navbar.css';
import logo from '../Assets/logo.png'
import {Link} from 'react-router-dom'
import { StoreContext } from "../../Context/setNavElementsContext"
import {actions} from '../../Context/setNavElementsContext'
import { useLocation } from 'react-router-dom';



export const Navbar = ({setIsLoggedIn}) => {
    const [state, dispatch] = useContext(StoreContext)
    const location = useLocation()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const hr = document.getElementsByTagName('hr')[0]
            const navbar = document.getElementById('navbar')
            
            if(window.scrollY > 40) {
                navbar.classList.add('shrink')
                hr.classList.add('shrink')
            }else if(navbar !== null && hr !== null){
                navbar.classList.remove('shrink')
                hr.classList.remove('shrink')
            }
        })
    },[])

    useEffect(() => {
        if(location.pathname === '/'){
            dispatch(actions.setElement("HOME"))
        }
        if(location.pathname.includes('/books/library') || location.pathname === '/books/for-sales'){
            dispatch(actions.setElement("BOOKS"))
        }
        if(location.pathname === '/blog'){
            dispatch(actions.setElement("BLOG"))
        }
    },[location.pathname])


    const handleClick = (value) => {
        dispatch(actions.setElement(value))

        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
          });
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

  return (
        <div className='navbar' id='navbar'>
            <Link className="link-style" to='/'>
                <div onClick={() => handleClick('HOME')} className='nav-logo'>
                    <img src={logo} alt="LOGO" />
                    <p>IT-er Service</p>
                </div>
            </Link>
            <ul className="nav-menu">
                <li className='nav-elements' onClick={() => handleClick('HOME')}><Link className="link-style" to='/'><p>HOME</p></Link> {state === 'HOME' ? <hr/> : <></>}</li>
                <li className='nav-elements'><p>BOOKS</p> {state === 'BOOKS' ? <hr/> : <></>}
                    <div className='books-section'>
                        <ul>
                            <li onClick={() => handleClick('BOOKS')}><Link className="link-style" to='/books/library'><p>LIBRARY</p></Link></li>
                            <li onClick={() => handleClick('BOOKS')}><Link className="link-style" to='/books/for-sales'><p>BOOKS FOR SALE</p></Link></li>
                        </ul>
                    </div>
                </li>
                <li  className='nav-elements'onClick={() => handleClick('BLOG')}><Link className="link-style" to='/blog'><p>BLOG</p></Link> {state === 'BLOG' ? <hr/> : <></>}</li>
            </ul>
            <div className="logout">
                <button onClick={handleLogout}><p>LOG OUT</p></button>
            </div>
        </div>
  )
}
