import React, {useContext} from 'react'
import './Footer.css'
import Fb from '../Assets/FB.png'
import Ins from '../Assets/ins-logo.png'
import Linkedin from '../Assets/Linkedin.png'
import logo from '../Assets/logo.png'
import {Link} from 'react-router-dom'
import { StoreContext } from "../../Context/setNavElementsContext"
import {actions} from '../../Context/setNavElementsContext'
import location from '../Assets/location.png'
import gmail from '../Assets/gmail.png'
import phone from '../Assets/phone.png'

export const Footer = () => {

  const [,dispatch] = useContext(StoreContext)


  const updateNavElements = value => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });

    dispatch(actions.setElement(value))
  }


  return (
    // <div className="footer-container">
    <div className='footer'>
            <div className="footer-body">
              <div className='footer-body-logo'>
                <div className="logo-frame">
                  <img src={logo} alt="" />
                </div>
                <h2>IT-er Service</h2>
              </div>
              <div className="footer-slogan">
                <p>
                  Equipping Students with a Vast Repository 
                  of Trusted Resources to Navigate the Complexities 
                  of the Digital Frontier and Shape Tomorrow's 
                  Technological Landscape.
                </p>
              </div>
              <div className="footer-nav">
                <h2>Useful Link</h2>
                <ul className="useful-link">
                  <li><Link onClick={() => updateNavElements('HOME')} className="link-style-footer" to='/'>Home</Link></li>
                  <li><Link onClick={() => updateNavElements('BOOKS')} className="link-style-footer" to='/books/library'>Library</Link></li>
                  <li><Link onClick={() => updateNavElements('BOOKS')} className="link-style-footer" to='/books/for-sale'>Books for sale</Link></li>
                  <li><Link onClick={() => updateNavElements('BLOG')}className="link-style-footer" to='/blog'>Blog</Link></li>
                </ul>
              </div>
              {/* <div className="footer-product">
                <h2></h2>
              </div> */}
              <div className="footer-contact">
                <h2>Contact</h2>
                <ul className="contact-us">
                  <li className='location'>
                    <img src={location}  alt="" />
                    <p>123 Main Street, London, W1A 1AA, United Kingdom</p>
                  </li>
                  <li>
                    <img src={gmail} alt="" />
                    <p>lequanghuy2108@gmail.com</p>
                  </li>
                  <li>
                    <img src={phone} alt="" />
                    <p>+44 20 1234 5678</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="line"></div>
            <p>&copy; 2024 IT-er Service. All rights reserved.</p>
            <div className='media-icons'>
              <a href='https://www.facebook.com/baloo.the/'>
                <img src={Fb} alt="" />
              </a>
              <a href='https://www.instagram.com/quang_huy_le_2108/'>
                <img src={Ins} alt="" />
              </a>
              <a href='https://www.linkedin.com/in/huy-l%C3%AA-quang-b68406241/'>
                <img src={Linkedin} alt="" />
              </a>
            </div>
    </div>
    // </div>
  )
}
