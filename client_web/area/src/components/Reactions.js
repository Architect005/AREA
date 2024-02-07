import React from 'react';
import { useRef, useState, useEffect} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate, useParams} from 'react-router-dom'
import "../styles/spotify.css"
import axios from "axios";

function Reaction() {
    const navRef = useRef();
    const {name} = useParams()
    const {id} = useParams()
    const navigate = useNavigate(); 
    const [actions, setActions] = useState();
    const [test, settest] = useState();
    // const lol = ["Notifications d'un message important reçu", "Envoie d'un mail avec un fichier attaché"];
    

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_Choose_service_r (Action_Choose) {
        localStorage.setItem("Reaction_Choose", JSON.stringify(Action_Choose))
        localStorage.setItem("Service_Reaction", JSON.stringify(id))
        navigate("../Home")
    }

    function submit() {
        axios.post("https://area-backend-v1.herokuapp.com/Choose_reaction", {
            service : id,        
            action : name,        
        }).then(res=> {
            console.log(res.data["actions"])
            setActions(res.data["actions"])
            settest("")
        }).catch(error=> {
            console.log('response: ', error.response.data["message"]);
        })
    }

    const Display = () => {
        if (!actions) return null;
        const All_actions = actions.map(test => <div key={test.id} className="flex-spotify" onClick={() => handleClick_Choose_service_r(test)}>{test}</div>)
        return (
            <div>
                <div className='flex-spotify-container'>
                    {All_actions}
                </div>
            </div>
        );
    };

    function check_submit() {
        if (test === undefined) {
            submit()
            return (true)
        }
        else
            return (false)
    }

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    const deleteItemFromLocalStorage = (key) => {
        localStorage.removeItem(key);
    }

    useEffect(() => {
        if (localStorage.getItem("Reaction_Choose")) {
          deleteItemFromLocalStorage("Reaction_Choose");
        }
    }, []);

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
            <h3>Selectionnez une réaction {id}</h3>    
            {check_submit() ? null : <Display></Display>}
        </>
    );
}

export default Reaction;

