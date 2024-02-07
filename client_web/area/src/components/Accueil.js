import React from 'react';
import { useRef} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "../styles/accueil.css";

function Accueil() {
    const navigate = useNavigate(); 

    function handleClick_regis () {
        navigate("./Register")
    }

    function handleClick_connect () {
        navigate("./Connexion")
    }

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    return (
        <>
        <header>
            <img src={require("../assets/area2.png")} alt=""/>
            <nav ref={navRef}>
                <a href="/#">Aide ?</a>
                <button className='connect' onClick={(e)=>handleClick_connect()}>Connectez-vous</button>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
        </header>        
        <div className='the_back'>
            <div className='pic'>
                <img src={require("../assets/area.png")} alt=""/>
            </div>
            <h1>Un moyen d'automatiser vos applications et logiciels<br/>Voulez-vous profiter des services de Area ?</h1>
            <br/><br/><br/><br/><button className='connect2' onClick={(e)=>handleClick_regis()}>Commençons</button>
        </div>
        </>
    );
}

export default Accueil;