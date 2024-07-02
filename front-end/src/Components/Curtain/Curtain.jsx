import React, { useEffect, useContext } from 'react'
import xIcon from '../../Components/Assets/x_icon.png'
import { actions } from '../../Context/setModalContext'
import { ModalContext } from '../../Context/setModalContext';

export const Curtain = ({ element }) => {

    const [state, dispatch] = useContext(ModalContext)

    const handleRemoveCurtain = () => {
        const curtain = document.getElementById('readingFeatureCurtain')
        const editForm = document.getElementById('editForm')
        const item = document.getElementById(element)

        if (curtain && editForm) {
            editForm.style.display = 'none'
            dispatch(actions.setModal(false))
        }

        if (curtain && item) {
            item.style.display = 'none'
        }

        curtain.style.display = 'none'
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
