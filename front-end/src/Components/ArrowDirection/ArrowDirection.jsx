import React from 'react'
import './ArrowDirection.css'
import nextIcon from '../Assets/nextIcon.png'
import prevIcon from '../Assets/prevIcon.png'

export const ArrowDirection = ({ length, amount, setCurrentIndex, currentIndex }) => {

    console.log(length)

    const prevComment = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - amount);
        }
    };

    const nextComment = () => {
        if (currentIndex < length - amount) {
            setCurrentIndex(currentIndex + amount);
        }
    };

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
