import React from 'react';
import { useRef} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "../styles/spotify.css";
import axios from "axios";

function Spotify() {
    const navRef = useRef();

    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    function submit (e) {
        console.log("cool")
        axios.post("https://area-backend-v1.azurewebsites.net/connect_spotify", {
        }).then(res=> {
            console.log(res.data)

            axios.post("https://area-backend-v1.azurewebsites.net/auth_gmail", {
            }).then(res=> {
                console.log(res.data)
            }).catch(error=> {
                console.log('response: ', error.response.data["message"]);
            })


        }).catch(error=> {
            console.log('response: ', error.response.data["message"]);
        })

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
            <h3>Selectionnez une action Spotify</h3>
            <div className='flex-container' onClick={(e) =>submit(e)}>
                <div className='flex-box'>
                    Jouer la musique recommandée  
                </div>
            </div>
        </>
    );
}

export default Spotify;