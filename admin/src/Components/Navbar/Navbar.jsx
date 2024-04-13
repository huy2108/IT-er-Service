import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'

export const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="LOGO" />
        <p>IT-er Service</p>
      </div>
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>
    </div>
  )
}
