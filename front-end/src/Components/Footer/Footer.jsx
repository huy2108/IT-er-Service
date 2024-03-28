import React from 'react'
import './Footer.css'
import Fb from '../Assets/FB.png'
import Ins from '../Assets/ins-logo.png'
import Linkedin from '../Assets/Linkedin.png'
import logo from '../Assets/logo.png'


export const Footer = () => {
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
                  <li>Home</li>
                  <li>Library</li>
                  <li>Books for sale</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div className="footer-product">
                <h2></h2>
              </div>
              <div className="footer-contact">
                <h2>Contact</h2>
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
