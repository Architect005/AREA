import React from 'react';
import { useRef, useState} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate, useParams} from 'react-router-dom'
import "../styles/choose_service_r.css";
import axios from 'axios';

function Chooses() {
    const navRef = useRef();
    const {id} = useParams()
    const [ServiceReaction, setServiceReaction] = useState();

    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_Reaction (Service_Reaction) {
        navigate("../Reaction/" + id + "/" + Service_Reaction)
    }

    // function handleClick_gma () {
    //     navigate("../Gmail")
    // }

    function submit() {
        axios.post("https://area-backend-v1.herokuapp.com/Choose_service_reaction", {
            service_reaction : id,        
        }).then(res=> {
            console.log(res.data["actions"])
            setServiceReaction(res.data["actions"])
        }).catch(error=> {
            console.log('response: ', error.response.data["message"]);
        })
    }

    function check_submit() {
        if (ServiceReaction === undefined) {
            submit()
            return (true)
        }
        else
            return (false)
    }

    const Display = () => {
        if (!ServiceReaction) return null;
        const All_actions = ServiceReaction.map(name => {
            if (name === 'OneDrive') {
              return (
                <div className=' flex-box8' onClick={() => handleClick_Reaction(name)}>
                    <img src={require("../assets/onedrive  .png")} height="100" alt="" className="one"/>
                    <span>Onedrive</span>
                </div>
              );
            } 
            if (name === 'Youtube') {
                return (
                    <div className=' flex-box5' onClick={() => handleClick_Reaction(name)} >
                        <img src={require("../assets/youtube.png")} height="100" alt="" className="you"/>
                        <span>Youtube</span>
                    </div>
                );
            }
            if (name === 'Gmail') {
                return (
                    <div className=' flex-box3' onClick={(e)=>handleClick_Reaction(name)}>
                        <img src={require("../assets/gm .png")} height="100" alt="" className="gma"/>
                        <span>Gmail</span>
                    </div>

                    
                );
            }
            if (name === 'Spotify') {
                return (
                    <div className=' flex-box' onClick={(e)=>handleClick_Reaction(name)}>
                        <img src={require("../assets/spo2.png")} height="100" alt="" className="spo"/>
                        <span>Spotify</span>
                    </div>
                );
            }
            if (name === 'Calendar') {
                return (
                    <div className=' flex-box4' onClick={(e)=>handleClick_Reaction(name)}>
                        <img src={require("../assets/outlook  .png")} height="100" alt="" className="out"/>
                        <span>Outlook</span>
                    </div>
                );
            }

          });
        return (
            <div>
                <div className='flex-spotify-container'>
                    {All_actions}
                </div>
            </div>
        );
    };

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }
    return (
        <>
        {console.log(id)}
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
        <h3>Selectionnez un service pour votre réaction</h3>
        {check_submit()}
        <Display></Display>

        {/* {submit()} */}
        
        {/* <div className='flex-container'>
            <div className=' flex-box' onClick={(e)=>handleClick_spo()}>
                <img src={require("../assets/spo2.png")} height="100" alt="" className="spo"/>
                <span>Spotify</span>
            </div>
            <div className=' flex-box2'>
                <img src={require("../assets/github.png")} height="100" alt="" className="git"/>
                <span>Github</span>
            </div>
            <div className=' flex-box3' onClick={(e)=>handleClick_gma()}>
                <img src={require("../assets/gm .png")} height="100" alt="" className="gma"/>
                <span>Gmail</span>
            </div>
            <div className=' flex-box4'>
                <img src={require("../assets/outlook  .png")} height="100" alt="" className="out"/>
                <span>Outlook</span>
            </div>
            <div className=' flex-box5'>
                <img src={require("../assets/youtube.png")} height="100" alt="" className="you"/>
                <span>Youtube</span>
            </div>
            <div className=' flex-box6'>
                <img src={require("../assets/discord .png")} height="100" alt="" className="dis"/>
                <span>Discord</span>
            </div>
            <div className=' flex-box7'>
                <img src={require("../assets/twi .png")} height="100" alt="" className="twi"/>
                <span>Twitter</span>
            </div>
            <div className=' flex-box8'>
                <img src={require("../assets/onedrive  .png")} height="100" alt="" className="one"/>
                <span>Onedrive</span>
            </div>
            <div className=' flex-box9'>
                <img src={require("../assets/clock.png")} height="100" alt="" className="clo"/>
                <span>Timer</span>
            </div>
        </div> */}
        </>
    );
}

export default Chooses;