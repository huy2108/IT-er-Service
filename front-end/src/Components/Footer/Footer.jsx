import React, {useContext} from 'react'
import './Footer.css'
import Fb from '../Assets/FB.png'
import Ins from '../Assets/ins-logo.png'
import Linkedin from '../Assets/Linkedin.png'
import logo from '../Assets/logo.png'
import {Link} from 'react-router-dom'
import { StoreContext } from "../../Context/setNavElementsContext"
import {actions} from '../../Context/setNavElementsContext'


export const Footer = () => {

  const [,dispatch] = useContext(StoreContext)


  const updateNavElements = value => {
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
                  <li onClick={() => updateNavElements('HOME')}><Link className="link-style-footer" to='/'>Home</Link></li>
                  <li onClick={() => updateNavElements('BOOKS')}><Link className="link-style-footer" to='/books/library'>Library</Link></li>
                  <li onClick={() => updateNavElements('BOOKS')}><Link className="link-style-footer" to='/books/for-sale'>Books for sale</Link></li>
                  <li onClick={() => updateNavElements('BLOG')}><Link className="link-style-footer" to='/blog'>Blog</Link></li>
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
