import React from 'react';
import { useRef, useState, useEffect} from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate, useParams} from 'react-router-dom'
import "../styles/spotify.css"
import axios from "axios";

function Choose_action() {
    const navRef = useRef();
    const {id} = useParams()
    const navigate = useNavigate(); 
    const [actions, setActions] = useState();
    const [Color, setAColor] = useState();
    const [BackColor, setBackColor] = useState();
    const [test, settest] = useState();
    

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_Choose_service_r (Action_Choose) {
        localStorage.setItem("Action_Choose", JSON.stringify(Action_Choose))
        localStorage.setItem("Service_Action", JSON.stringify(id))
        navigate("../Choose_service_r/" + Action_Choose)
    }

    function submit() {
        axios.post("https://area-backend-v1.herokuapp.com/Choose_service", {
            service : id,        
        }).then(res=> {
            console.log(res.data["actions"])
            setActions(res.data["actions"])
            setAColor(res.data["color"])
            setBackColor(res.data["BackColor"])
            settest("")
        }).catch(error=> {
            console.log('response: ', error.response.data["message"]);
        })
    }

    const Display = () => {
        if (!actions) return null;
        const All_actions = actions.map(test => <div key={test.id} className="flex-youtube" style={{background: BackColor, color: Color}} onClick={() => handleClick_Choose_service_r(test)}>{test}</div>)
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
        if (localStorage.getItem("Action_Choose")) {
          deleteItemFromLocalStorage("Action_Choose");
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
            <h3>Selectionnez une action {id}</h3>    
            {check_submit() ? null : <Display></Display>}
        </>
    );
}

export default Choose_action;

