// src/StarRating.js
import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, emptyColor }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = totalStars - fullStars - (partialStar ? 1 : 0);

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => (
                <span key={i} className="star active">★</span>
            ))}
            {partialStar > 0 && (
                <span className="star partial" style={{ '--fill': partialStar * 100 + '%' }}>★</span>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={i + fullStars + 1} className={`star empty ${emptyColor}`} >★</span>
            ))
            }
        </div >
    );
};

export default StarRating;
