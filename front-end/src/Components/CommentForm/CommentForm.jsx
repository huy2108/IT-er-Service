import React from 'react'


export const CommentForm = ({ setContent, content, rating, choseRating, setRating, setChoseRating, handleAction }) => {

    const handleMouseOut = () => {
        setRating(choseRating)
    }

    const handleStarHover = (index) => {
        setRating(index + 1);
    };

    const handleStarClick = (index) => {
        // Set rating in state or send to server
        setChoseRating(index + 1)
    };

    return (
        // <div className="commentParent">
        <form onSubmit={handleAction} className="commentForm">

            <div className="star-rating" id='star-rating'>
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={index < rating ? 'star active' : 'star'}
                        onMouseOver={() => handleStarHover(index)}
                        onMouseOut={handleMouseOut}
                        onClick={() => handleStarClick(index)}
                    >
                        &#9733;
                    </span>
                ))}
            </div>

            <div className="comment">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} name="commentContent" id="commentContent" required />
                <button id='commentButton'>Save</button>
            </div>
        </form>
        // </div >
    )
}
