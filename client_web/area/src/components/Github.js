import React, {useState, useRef, useEffect } from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

function Github() {
    const navRef = useRef();

    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    return (
        <>
        <header>
            <img src={require("../assets/area2.png")} alt="" onClick={(e)=>handleClick_back()}/>
            <nav ref={navRef}>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
        </header>
        </>
	)
}

export default Github;