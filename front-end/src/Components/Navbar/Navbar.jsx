import React, { useEffect } from 'react'
import { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png'
import {Link} from 'react-router-dom'



export const Navbar = () => {
    const [menu,setMenu] = useState('HOME')

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const hr = document.getElementsByTagName('hr')[0]
            const navbar = document.getElementById('navbar')
            
            if(window.scrollY > 0) {
                navbar.classList.add('shrink')
                hr.classList.add('shrink')
            }else {
                navbar.classList.remove('shrink')
                hr.classList.remove('shrink')
            }
        })
    },[])

    const handleClick = (value) => {
        setMenu(value)

        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
          });
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
                <li onClick={() => handleClick('HOME')}><Link className="link-style" to='/'><p>HOME</p></Link> {menu === 'HOME' ? <hr/> : <></>}</li>
                <li onClick={() => handleClick('BOOKS')}><Link className="link-style" to='/books/library'><p>BOOKS</p></Link> {menu === 'BOOKS' ? <hr/> : <></>}
                    <div className='books-section'>
                        <ul>
                            <li><Link className="link-style" to='/books/library'><p>LIBRARY</p></Link></li>
                            <li><Link className="link-style" to='/books/for-sales'><p>BOOKS FOR SALE</p></Link></li>
                        </ul>
                    </div>
                </li>
                <li onClick={() => handleClick('BLOG')}><Link className="link-style" to='/blog'><p>BLOG</p></Link> {menu === 'BLOG' ? <hr/> : <></>}</li>
            </ul>
            <div className="login">
                <button><Link className="link-style" to='/login'><p>LOG IN</p></Link></button>
            </div>
        </div>
  )
}
