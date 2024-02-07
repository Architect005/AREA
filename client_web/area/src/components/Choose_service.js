import React from 'react';
import { useRef} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "../styles/choose_service.css";
import axios from 'axios';

function Choose() {
    const navRef = useRef();
    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_spo (service_name) {
        if (service_name === "Github") {
            // window.open("https://my.epitech.eu/index.html#d/2021/B-NWP-400/myftp/4765672", '_blank', 'noopener,noreferrer')
            
            axios.post("https://area-backend-v1.herokuapp.com/github_login", {
            }).then(res=> {
                window.open(res.data["url"], '_blank', 'noopener,noreferrer')
                console.log(res.data["url"])
            }).catch(error=> {
                console.log('response: ', error.response.data["message"]);
            })

        }
        if (service_name === "Gmail") {
            // window.open("https://my.epitech.eu/index.html#d/2021/B-NWP-400/myftp/4765672", '_blank', 'noopener,noreferrer')
            
            axios.get("https://area-backend-v1.herokuapp.com/auth_gmail", {
            }).then(res=> {
                window.open(res.data["url"], '_blank', 'noopener,noreferrer')
                console.log(res.data)
            }).catch(error=> {
                console.log('response: ', error.response.data["message"]);
            })

        }

        if (service_name === "Outlook") {
            // window.open("https://my.epitech.eu/index.html#d/2021/B-NWP-400/myftp/4765672", '_blank', 'noopener,noreferrer')
            
            axios.post("https://area-backend-v1.herokuapp.com/homepage", {
            }).then(res=> {
                window.open(res.data["url"], '_blank', 'noopener,noreferrer')
                console.log(res.data)
            }).catch(error=> {
                console.log('response: ', error.response.data["message"]);
            })

        }
        if (service_name === "Youtube") {
            // window.open("https://my.epitech.eu/index.html#d/2021/B-NWP-400/myftp/4765672", '_blank', 'noopener,noreferrer')
            // window.open("https://area-backend-v1.herokuapp.com/youtube_login", '_blank', 'noopener,noreferrer')
            
            axios.get("https://area-backend-v1.herokuapp.com/youtube_login", {
            }).then(res=> {
                window.open(res.data["url"], '_blank', 'noopener,noreferrer')
                console.log(res.data)
            }).catch(error=> {
                console.log('response: ', error.response.data["message"]);
            })

        }

        // window.open("https://www.youtube.com/watch?v=2yPL7-nyjTk", '_blank', 'noopener,noreferrer')
        navigate("../Choose_action/"+ service_name)
    }

    // function handleClick_gma () {
    //     navigate("../Gmail")
    // }

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
        <h3>Selectionnez votre service</h3>
        <div className='flex-container'>
            {/* <div className=' flex-box' onClick={(e)=>handleClick_spo("Spotify")}>
                <img src={require("../assets/spo2.png")} height="100" alt="" className="spo"/>
                <span>Spotify</span>
            </div> */}
            <div className=' flex-box2' onClick={(e)=>handleClick_spo("Github")}>
                <img src={require("../assets/github.png")} height="100" alt="" className="git"/>
                <span>Github</span>
            </div>
            <div className=' flex-box3' onClick={(e)=>handleClick_spo("Gmail")}>
                <img src={require("../assets/gm .png")} height="100" alt="" className="gma"/>
                <span>Gmail</span>
            </div>
            <div className=' flex-box4' onClick={(e)=>handleClick_spo("Calendar")}>
                <img src={require("../assets/outlook  .png")} height="100" alt="" className="out"/>
                <span>Outlook</span>
            </div>
            <div className=' flex-box5' onClick={(e)=>handleClick_spo("Youtube")}>
                <img src={require("../assets/youtube.png")} height="100" alt="" className="you"/>
                <span>Youtube</span>
            </div>
            <div className=' flex-box6' onClick={(e)=>handleClick_spo("Slack")}>
                <img src={require("../assets/slack.png")} height="100" alt="" className="dis"/>
                <span>Slack</span>
            </div>
            {/* <div className=' flex-box7' onClick={(e)=>handleClick_spo("Twitter")}>
                <img src={require("../assets/twi .png")} height="100" alt="" className="twi"/>
                <span>Twitter</span>
            </div> */}
            {/* <div className=' flex-box8' onClick={(e)=>handleClick_spo("Onedrive")}>
                <img src={require("../assets/onedrive  .png")} height="100" alt="" className="one"/>
                <span>Onedrive</span>
            </div> */}
            {/* <div className=' flex-box9' onClick={(e)=>handleClick_spo("Timer")}>
                <img src={require("../assets/clock.png")} height="100" alt="" className="clo"/>
                <span>Timer</span>
            </div> */}
        </div>
        </>
    );
}

export default Choose;