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

            </div>
            
        </div>
    </div>
  )
}
