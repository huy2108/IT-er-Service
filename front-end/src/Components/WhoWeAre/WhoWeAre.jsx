import React, { useEffect } from 'react'
import styles from './whoWeAre.module.css'
import founder from '../Assets/founder.png'

export const WhoWeAre = () => {

    useEffect(() => {
        
    } ,[])

  return (
    <div className={styles.container} id='who-we-are'>
        <h1>WHO WE ARE?</h1>
        <div className={styles.whoWeAre}>
            <div className={styles.whoImage}>
                <img src={founder} alt="" />
                <div className={styles.curtain}></div>
                <p className={styles.pFounder}>
                        Founder
                </p>
                <p className={styles.pName}>
                        Le Quang Huy
                </p>
                
            </div>
            <div className={styles.whoContent}>
              <p>
              Hello, I'm Le Quang Huy, the founder of IT-er Service. As a passionate advocate 
              for technology and education, I embarked on a mission to create a digital sanctuary 
              for IT students worldwide. With a background in designing an interative website, 
              I recognized the need for a centralized platform offering trustworthy resources to empower 
              aspiring technologists. Here at IT-er Service, my vision is to cultivate a thriving community 
              where students can explore, learn, and excel in the dynamic field of information technology. 
              Join me on this exciting journey as we harness the power of knowledge to shape tomorrow's tech leaders.
              </p>
            </div>
            
        </div>
    </div>
  )
}
