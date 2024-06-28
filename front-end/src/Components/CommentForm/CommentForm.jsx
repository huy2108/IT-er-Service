import React, { useState, useContext } from 'react';
import './CommentForm.css';
import { actions } from '../../Context/setModalContext'
import { ModalContext } from '../../Context/setModalContext';

export const CommentForm = ({ setContent, content, rating, choseRating, setRating, setChoseRating, handleAction, handleDelete, adjust }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, dispatch] = useContext(ModalContext)


    const handleMouseOut = () => {
        setRating(choseRating);
    };

    const handleStarHover = (index) => {
        setRating(index + 1);
    };

    const handleStarClick = (index) => {
        setChoseRating(index + 1);
    };

    const openModal = () => {
        dispatch(actions.setModal(true))
    };

    const closeModal = () => {
        dispatch(actions.setModal(false))
    };

    const confirmDelete = () => {
        handleDelete();
        closeModal();
    };

    return (
        <>
            <form onSubmit={handleAction} className="commentForm" style={adjust ? { marginBottom: '20px' } : {}}>
                <div className="star-rating" id="star-rating">
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
                    <div className="buttonContainer">
                        {handleDelete &&
                            <button type="button" onClick={openModal} className="deleteButton">Delete</button>
                        }
                        <button type="submit" id="commentButton">Save</button>
                    </div>
                </div>
            </form>

            {state && (
                <div className="modal" id='modal'>
                    <div className="modalContent">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this comment?</p>
                        <button onClick={confirmDelete} className="confirmButton">Yes, delete it</button>
                        <button onClick={closeModal} className="cancelButton">Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
};
