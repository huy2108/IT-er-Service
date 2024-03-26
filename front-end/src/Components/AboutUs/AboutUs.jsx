import React from 'react'
import './AboutUs.css'
import * as Icon from 'react-feather';

export const AboutUs = () => {
  return (
    <div className='container' id='about-us'>
        <div className="aboutUs">
            <div className="aboutUs-content">
              <h1>ABOUT US</h1>
              <Icon.ChevronLeft size={48} id='chevronLeft'/>
              <p>
                We welcome you to a dedicated platform crafted to 
                streamline IT resources and books, tailored specifically 
                for IT students. Our mission is simple: to make self-learning 
                in the realm of information technology both accessible and 
                enriching. Join us and embark on a journey where knowledge meets 
                empowerment, one resource at a time.
              </p>
              <Icon.ChevronRight size={48} id='chevronRight'/>
            </div>
        </div>
    </div>
  )
}
