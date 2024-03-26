import React from 'react'
import './Hero.css'
import library from '../Assets/Library.jpg'
import itPic from '../Assets/it-picture.webp'


export const Hero = () => {
  return (
        <div className="hero">
            <div className="hero-left">
                <h1>Fostering Future Leaders in the Digital Age</h1>
                <p>Empowering Students Through IT Education, Igniting Curiosity, and Cultivating Innovation for Tomorrow's Challenges</p>
            </div>
            <div className="hero-right">

            </div>
            <div className="img-left">
                <img src={itPic} alt="" />
            </div>
            <div className="img-right">
                <img src={library} alt="" />
            </div>
            <div className="blur-text">
                <h1>Unlocking Minds</h1>
                <p>Where Stories Take Flight, Imagination Knows No Bounds, and Every Page Holds the Key to New Worlds Waiting to Be Discovered</p>
            </div>
        </div>

  )
}
