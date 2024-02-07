import React from 'react';
import { useRef} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "../styles/gmail.css";

function Gmail() {
    const navRef = useRef();

    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_reaction () {
        navigate("../Choose_service_r")
    }

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }
    return (
        <>
        <header>
            <img src={require("../assets/area2.png")} alt="" onClick={(e)=>handleClick_back()}/>
            <nav ref={navRef}>
                {/* <a href="/#">Déjà un compte ?</a>
                <button className='connect' onClick={(e)=>handleClick_con()}>Connectez-vous</button> */}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
        </header>
        <h3>Selectionnez une action Gmail</h3>
        <div className='flex-container'>
            <div className='flex-box' onClick={(e)=>handleClick_reaction()}>
                Reçevoir un mail de recommandation Spotify   
            </div>
        </div>
        </>
    );
}

export default Gmail;