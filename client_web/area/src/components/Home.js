import React from 'react';
import { useRef, useState, useEffect} from 'react';
// import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "../styles/home.css";
import {FaTrash} from "react-icons/fa";
import {FaCaretRight} from "react-icons/fa";
import axios from "axios";

function Home() {
    const navRef = useRef();
    const [username, setUsername] = useState();
    const [Image, setImage] = useState();
    const [State, setState] = useState("")

    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_profile () {
        navigate("../profile")
    }

    function handleClick_tri () {
        navigate("../Choose_service")
    }

    // const showNavbar = () => {
    //     navRef.current.classList.toggle("responsive_nav")
    // }


    function Check_Valid_Token() {
        axios.post("https://area-backend-v1.herokuapp.com/Token", {
            token : JSON.parse(localStorage.getItem("_token"))
            
            }).then(res=> {
                if (res.data["message"] === "Valid token") {
                    console.log(res.data)
                    setUsername(res.data["username"])
                    setImage(res.data["url_image"])
                }
            })
            .catch(error=> {
                console.log('response: ', error.response.data["message"]);
                navigate("../Register")
            })
        if (username !== "")
            return (true)
        else
            return (false)
    }


    function Display_Area() {
        if (State !== "")
            return true
        else
            return false
    }

    const deleteItemFromLocalStorage = (key) => {
        localStorage.removeItem(key);
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("_token"));
        const fetchData = async () => {
          try {
            Check_Valid_Token();
      
            const response = await axios.post(
              "https://area-backend-v1.herokuapp.com/DisplayArea",
              { _token: token }
            );
            console.log(response.data);
            setState(response.data["info"]);
          } catch (error) {
            console.log("response: ", error.response.data["message"]);
            console.log("Never")
            setState("");
          }
        };
        try {
            if (
                  localStorage.getItem("Action_Choose") &&
                  localStorage.getItem("Reaction_Choose")
                ) {
                    console.log("Never")
                    axios.post(
                    "https://area-backend-v1.herokuapp.com/SendArea",
                    {
                      Action: localStorage.getItem("Action_Choose"),
                      Reaction: localStorage.getItem("Reaction_Choose"),
                      Service_Action: localStorage.getItem("Service_Action"),
                      Service_Reaction: localStorage.getItem("Service_Reaction"),
                      _token: token,
                    }
                  );
                  deleteItemFromLocalStorage("Action_Choose");
                  deleteItemFromLocalStorage("Reaction_Choose");
                  deleteItemFromLocalStorage("Service_Reaction");
                  deleteItemFromLocalStorage("Service_Action");
                }
        } catch (error) {
            console.log("response: ", error.response.data["message"]);
            console.log("Never")
            setState("");
          }
      
        fetchData();
      }, []);
      

    function Notification(props) {
        const [showPopup, setShowPopup] = useState(false)
        const [popupText, setPopupText] = useState('')
        
        const handleClick = (text) =>{
            setShowPopup(true);
            setPopupText(text);
        }

        const handlePopupClose = () => {
            setShowPopup(false);
        }
        
        function DeleteArea(Action, Reaction) {
            axios.post("https://area-backend-v1.herokuapp.com/DeleteArea", {
                _token : JSON.parse(localStorage.getItem("_token")),
                Action: Action,
                Reaction: Reaction
            
            }).then(res=> {
                console.log(res.data)
                window.location.reload()
            })
            .catch(error=> {
                console.log('response: ', error.response.data["message"]);
            })
        }

        const notificationItems = props.notificationData.map((notification, index) => (
            <div>
            <div key={index} style={{width: "200px", height: "100px", background: "#cccc"
            , borderRadius: "20px", margin: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", lineHeight: "160px",
            cursor: "pointer", transition: "1s"}} className="test" onClick={() => handleClick({nb0 : notification[0], nb1: notification[1], nb2: notification[2], nb3: notification[3]})}>
                {notification[2] === "Youtube" && <img src={require('../assets/YouTubeArea.png')} height="60px" alt=''></img>}
                {notification[2] === "Github" && <img src={require('../assets/GithubArea.png')} height="60px" alt=''></img>}
                {notification[2] === "Spotify" && <img src={require('../assets/spo2.png')} height="60px" alt=''></img>}
                {notification[2] === "Timer" && <img src={require('../assets/exclamation.png')} height="60px" alt=''></img>}
                {notification[2] === "Gmail" && <img src={require('../assets/Gmail-Logo.png')} height="60px" alt=''></img>}
                {notification[2] === "OneDrive" && <img src={require('../assets/onedrive  .png')} height="60px" alt=''></img>}
                <FaCaretRight style={{color: ""}}></FaCaretRight>
                {notification[3] === "Youtube" && <img src={require('../assets/YouTubeArea.png')} height="60px" alt=''></img>}
                {notification[3] === "Github" && <img src={require('../assets/GithubArea.png')} height="60px" alt=''></img>}
                {notification[3] === "Spotify" && <img src={require('../assets/spo2.png')} height="60px" alt=''></img>}
                {notification[3] === "Timer" && <img src={require('../assets/exclamation.png')} height="60px" alt=''></img>}
                {notification[3] === "Gmail" && <img src={require('../assets/Gmail-Logo.png')} height="60px" alt=''></img>}
                {notification[3] === "OneDrive" && <img src={require('../assets/onedrive  .png')} height="60px" alt=''></img>}
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
                <p style={{textAlign: "center", color: "red", marginRight: "10px"}} onClick={() => DeleteArea(notification[0], notification[1])}>Supprimer</p>
                <FaTrash style={{color: "red"}}></FaTrash>
            </div>
            </div>
        ));
        return (
            <div>
                <div style={{width: "100%", display: "flex", height: "auto", flexDirection: "row", flexWrap: "wrap", backgroundPosition: "center"}}>
                    {notificationItems}
                </div>
                {showPopup && (
                    <div className="modal">
                        <div  className="overlay"></div>
                        <div className="modal-content">
                            <h2>{popupText.nb2} and {popupText.nb3}</h2>
                            <p>Action: {popupText.nb0}</p>
                            <p>Reaction: {popupText.nb1}</p>
                            <button className="close-modal" onClick={handlePopupClose}>
                                CLOSE
                            </button>
                        </div>
                        </div>
                )}
            </div>
        );
    }
    
    function GetNotif() {
      return (
        <div>
            <Notification notificationData={State}></Notification>
        </div>
      )
    }
    


    const Display = () => {

        
        return (
            <>
                <header>
                    <img src={require("../assets/area2.png")} alt="" onClick={(e)=>handleClick_back()}/>
                    <nav ref={navRef} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
                        <p>{username}</p>
                        <img src={Image} alt="" style={{width: "200px", cursor: "pointer"}} onClick={(e)=>handleClick_profile()}></img>
                        {/* <button className='connect'>Connectez-vous</button>
                        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                            <FaTimes/>
                        </button> */}
                    </nav>
                </header>
                {Display_Area() ?
                    <>
                        <GetNotif></GetNotif>
                        <div className='add' onClick={(e)=>handleClick_tri()}>
                            <img src={require("../assets/add.png")} alt="" ></img>
                        </div>
                    </>
                    :
                    <>
                        <div className='empty'>
                            <img src={require("../assets/exclamation.png")} alt="" ></img>
                            <h1>Aucun AREA disponible</h1>
                        </div>
                        <div className='add' onClick={(e)=>handleClick_tri()}>
                            <img src={require("../assets/add.png")} alt="" ></img>
                        </div>
                    </>
                }
            </>
        )
    }

    return (
        <>
            {<Display></Display>}
        </>
    );
}

export default Home;