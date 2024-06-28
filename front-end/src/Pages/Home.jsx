import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { AboutUs } from '../Components/AboutUs/AboutUs'
import { WhoWeAre } from '../Components/WhoWeAre/WhoWeAre'
import '../Components/Ribbon/ribbon.css'


export const Home = () => {

  const scrollToAboutUs = () => {
    document.getElementById("about-us").scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWhoWeAre = () => {
    document.getElementById("who-we-are").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero />
      <div className="ribbon">
        <p onClick={scrollToAboutUs}>About Us</p>
        <p onClick={scrollToWhoWeAre}>Who we are</p>
      </div>
      <AboutUs />
      <WhoWeAre />
    </div>
  )
}
