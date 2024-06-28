import React, { useEffect, useContext } from 'react'
import xIcon from '../../Components/Assets/x_icon.png'
import { actions } from '../../Context/setModalContext'
import { ModalContext } from '../../Context/setModalContext';

export const Curtain = () => {

    const [state, dispatch] = useContext(ModalContext)

    const handleRemoveCurtain = () => {
        const curtain = document.getElementById('readingFeatureCurtain')
        const bookContent = document.getElementById('readingFeatureContent')
        const editForm = document.getElementById('editForm')
        const changePasswordForm = document.getElementById('changePasswordForm')

        if (curtain && bookContent) {
            curtain.style.display = 'none'
            bookContent.style.display = 'none'
        }

        if (curtain && editForm) {
            curtain.style.display = 'none'
            editForm.style.display = 'none'
            dispatch(actions.setModal(false))
        }

        if (curtain && changePasswordForm) {
            curtain.style.display = 'none'
            changePasswordForm.style.display = 'none'
        }
    }

    function handleKeyDown(event) {
        // console.log(123)
        // Check if the pressed key is the "Esc" key (key code 27)
        if (event.keyCode === 27) {
            const curtain = document.getElementById('readingFeatureCurtain')
            curtain.click()
            // Set clicked state to true
            handleRemoveCurtain()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        // Cleanup: remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="bookContentCurtain" id='readingFeatureCurtain'>
            <img src={xIcon} alt="" onClick={handleRemoveCurtain} />
        </div>
    )
}
