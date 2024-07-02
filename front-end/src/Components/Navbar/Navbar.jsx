import React, { useEffect, useState, useContext, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { StoreContext } from "../../Context/setNavElementsContext";
import { actions } from '../../Context/setNavElementsContext';
import { useLocation } from 'react-router-dom';

export const Navbar = ({ setIsLoggedIn }) => {
    const [state, dispatch] = useContext(StoreContext);
    const location = useLocation();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const logoutMenu = useRef(null)
    const [navMenuVisible, setNavMenuVisible] = useState(false); // State for hamburger menu

    useEffect(() => {
        const handleScroll = () => {
            const hr = document.getElementsByTagName('hr')[0];
            const navbar = document.getElementById('navbar');

            // console.log(hr)
            if (hr !== undefined) {
                if (window.scrollY > 40) {
                    navbar.classList.add('shrink');
                    hr.classList.add('shrink');
                } else if (navbar !== null && hr !== null) {
                    navbar.classList.remove('shrink');
                    hr.classList.remove('shrink');
                }
            } else {
                if (window.scrollY > 40) {
                    navbar.classList.add('shrink');
                } else if (navbar !== null && hr !== null) {
                    navbar.classList.remove('shrink');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(actions.setElement("HOME"));
        } else if (location.pathname.includes('/books/library') || location.pathname === '/books/for-sales') {
            dispatch(actions.setElement("BOOKS"));
        } else if (location.pathname === '/forum') {
            dispatch(actions.setElement("FORUM"));
        } else {
            dispatch(actions.setElement(''));
        }
    }, [location.pathname, dispatch]);
    // console.log(state)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (value) => {
        dispatch(actions.setElement(value));

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleOnClickLogOut = () => {
        if (menuVisible) {
            // If the menu is currently visible, add the 'close' class to trigger the close animation
            logoutMenu.current.classList.add('close');
            setTimeout(() => {
                // After the close animation, hide the menu and remove the 'close' class
                setMenuVisible(false);
                logoutMenu.current.classList.remove('close');
            }, 500); // Match this duration to your CSS animation duration
        } else {
            // Show the menu
            logoutMenu.current.classList.remove('close');
            setMenuVisible(true);
        }
    };

    console.log(logoutMenu.current)

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    console.log(logoutMenu.current)

    return (
        <>
            <div className='navbar' id='navbar'>
                <Link className="link-style" to='/'>
                    <div onClick={() => handleClick('HOME')} className='nav-logo'>
                        <img src={logo} alt="LOGO" />
                        <p>IT-er Service</p>
                    </div>
                </Link>
                <ul className='nav-menu'>
                    <li className='nav-elements' onClick={() => handleClick('HOME')}>
                        <Link className="link-style" to='/'><p>HOME</p></Link>
                        {state === 'HOME' && <hr />}
                    </li>
                    <li className='nav-elements'>
                        <p>BOOKS</p>
                        {state === 'BOOKS' && <hr />}
                        <div className='books-section'>
                            <ul>
                                <li onClick={() => handleClick('BOOKS')}>
                                    <Link className="link-style" to='/books/library'><p>LIBRARY</p></Link>
                                </li>
                                <li onClick={() => handleClick('BOOKS')}>
                                    <Link className="link-style" to='/books/for-sales'><p>BOOKS FOR SALE</p></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='nav-elements' onClick={() => handleClick('FORUM')}>
                        <Link className="link-style" to='/forum'><p>FORUM</p></Link>
                        {state === 'FORUM' && <hr />}
                    </li>
                </ul>
                <div className="hamburger-menu" onClick={() => setNavMenuVisible(!navMenuVisible)}>

                </div>
                <div className="logout" onClick={handleOnClickLogOut} ref={menuRef}>
                    <ul ref={logoutMenu} className={`logout-menu ${menuVisible ? 'show' : ''} `} onClick={stopPropagation}>
                        <li className="logout-items">
                            <Link className='link-style' to='view-user'><p onClick={handleOnClickLogOut}>View Profile</p></Link>
                        </li>
                        <li className="logout-items">
                            <button onClick={handleLogout}><p>LOG OUT</p></button>
                        </li>
                    </ul>
                </div>

            </div>
            <ul className={`hamburger-dashboard ${navMenuVisible ? 'open' : ''}`}>

            </ul>
        </>
    );
};
