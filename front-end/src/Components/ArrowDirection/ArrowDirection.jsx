import React from 'react'
import './ArrowDirection.css'
import nextIcon from '../Assets/nextIcon.png'
import prevIcon from '../Assets/prevIcon.png'

export const ArrowDirection = ({ length, amount, setCurrentIndex, currentIndex, positionPage }) => {

    // console.log(length)

    const prevComment = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - amount);
        }

        if (positionPage) {
            document.getElementById(positionPage).scrollIntoView({ behavior: "smooth" });
        }
    };

    const nextComment = () => {
        if (currentIndex < length - amount) {
            setCurrentIndex(currentIndex + amount);
        }

        if (positionPage) {
            document.getElementById(positionPage).scrollIntoView({ behavior: "smooth" });
        }
    };

    console.log(currentIndex)

    return (
        <div className="commentDirection">
            {currentIndex !== 0 &&
                <div className="nextPrevContainer">
                    <img onClick={prevComment} src={prevIcon} alt="" className='nextIconComment' />
                </div>
            }

            <div className="nextPrevContainer">
                <img onClick={nextComment} style={currentIndex < length - amount ? {} : { 'display': 'none' }} src={nextIcon} alt="" className='nextIconComment' />
            </div>

        </div>
    )
}
