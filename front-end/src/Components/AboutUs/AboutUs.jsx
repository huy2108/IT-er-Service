import React, {useState} from 'react'
import './AboutUs.css'
import * as Icon from 'react-feather';

export const AboutUs = () => {

  const [state,setState] = useState(1);

  const handleToglleUp = () => {
    if(state < 2) {
      setState(state + 1)
    }
  }
  const handleToggleDown = () => {
    if(state > 1) {
      setState(state - 1)
    }
  }

  return (
    <div className='container' id='about-us'>
        <div className="aboutUs">
            <div className="aboutUs-content">
              <h1>ABOUT US</h1>
              <Icon.ChevronLeft size={48} onClick={handleToggleDown} className='icon' id='chevronLeft'/>
              <p className={state === 1 ? 'show' : 'remove'}>
                We welcome you to a dedicated platform crafted to 
                streamline IT resources and books, tailored specifically 
                for IT students. Our mission is simple: to make self-learning 
                in the realm of information technology both accessible and 
                enriching. Join us and embark on a journey where knowledge meets 
                empowerment, one resource at a time.
              </p>
              <p className={state === 2 ? 'show' : 'remove'}>
              We provide trustworthy sources in IT, empowering you to learn 
              efficiently and fearlessly. Count on our dedication to deliver fresh 
              insights daily, keeping you updated on the latest trends without 
              worrying about fake information. With us, stay ahead in the ever-evolving 
              world of technology.
              </p>
              <Icon.ChevronRight onClick={handleToglleUp} className='icon' size={48} id='chevronRight'/>
              <div className="dots">
                <span className={state === 1 ? 'activeDot' : ''} ></span>
                <span className={state === 2 ? 'activeDot' : ''} ></span>
              </div>
            </div>
        </div>
    </div>
  )
}
