import React from 'react';
import { useRef, useState } from 'react';
import {FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "../styles/home.css";
import axios from "axios";
import {FaArrowLeft} from "react-icons/fa"

function Profile() {
    const navRef = useRef();
    const [username, setUsername] = useState();
    const [data, setData] = useState({
        username : "",
        Oldpassword: "",
        Newpassword : "",
        NewpasswordConfirm : ""
      })      

    const [Image, setImage ] = useState("");
    const [url,setUrl ] = useState("");    

    const uploadImage_exist = async () => {
        const Data = new FormData();
        Data.append("file", Image);
        Data.append("upload_preset", "athvb6od");
        Data.append("cloud_name", "dw5omgtiz");
        axios.post("https://api.cloudinary.com/v1_1/dw5omgtiz/image/upload", Data)
        .then(resp => resp.data)
        .then(Data => {

        axios.post("https://area-backend-v1.herokuapp.com/ChangeInfo", {
            url_image: Data.url,
            username : data.username,
            name: username,
            Oldpassword: data.Oldpassword,
            Newpassword : data.Newpassword,                
        }).then(res=> {
            console.log(res.data["message"])
            window.location.reload();
        }).catch(error=> {
            console.log('response: ', error.response.data["message"]);
        })

        })
        .catch(err => {
            console.log(err);
        });
    };


    const navigate = useNavigate(); 

    function handleClick_back () {
        navigate("../")
    }

    function handleClick_Home () {
        navigate("../Home")
    }

    function handleClick_profile () {
        navigate("../profile")
    }

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    function handle(e) {
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    async function submit(e) {
        e.preventDefault();
        console.log("username" + data.username + " password" + data.password + " email" + data.email)
        if ((data.Newpassword !== data.NewpasswordConfirm) || (Image === "" && data.username === "" && data.Oldpassword === "" && data.Newpassword === ""))
            console.log("Wrong!!!!")
        else {
            if (Image !== "") {
                await uploadImage_exist();
            }
            else{
                axios.post("https://area-backend-v1.herokuapp.com/ChangeInfo", {
                url_image: "",
                username : data.username,
                name: username,
                Oldpassword: data.Oldpassword,
                Newpassword : data.Newpassword,                
                }).then(res=> {
                    window.location.reload();
                    console.log(res.data["message"])
                }).catch(error=> {
                    console.log('response: ', error.response.data["message"]);
                })
            }
        }
    }

    function Check_Valid_Token() {
        axios.post("https://area-backend-v1.herokuapp.com/Token", {
            token : JSON.parse(localStorage.getItem("_token"))
            
            }).then(res=> {
                if (res.data["message"] === "Valid token") {
                    setUsername(res.data["username"])
                    setUrl(res.data["url_image"])
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


    return (
        <>
            {Check_Valid_Token() ?
                <>
                <header>
                    <img src={require("../assets/area2.png")} alt="" onClick={(e)=>handleClick_back()}/>
                    <nav ref={navRef} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
                        <p>{username}</p>
                        <img src={url} alt="" style={{width: "200px", cursor: "pointer"}} onClick={(e)=>handleClick_profile()}></img>
                        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                            <FaTimes/>
                        </button>
                    </nav>
                </header>
                <div className='col2'>
                    <FaArrowLeft style={{fontSize: "25px", cursor: "pointer", margin: "20px"}} onClick={(e)=>handleClick_Home()}></FaArrowLeft>
                    <form id='form' className='flex col' onSubmit={(e) => submit(e)} method="post">
                        <img src={url} alt=''/>
                        <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                        <input onChange={(e)=> handle(e)} id="username" value={data.username} type="text" placeholder="Nom d'utilisateur"></input>
                        <input onChange={(e)=> handle(e)} id="Oldpassword" value={data.Oldpassword} type="password" placeholder="Entrez l'ancien mot de passe"></input>
                        <input onChange={(e)=> handle(e)} id="Newpassword" value={data.Newpassword} type="password" placeholder='Nouveau mot de passe'></input>
                        <input onChange={(e)=> handle(e)} id="NewpasswordConfirm" value={data.NewpasswordConfirm} type="password" placeholder='Confirmez le nouveau mot de passe'></input>
                        <button className='btn'>Enregistrez les informations</button>
                    </form>
                    <div style={{textAlign: "center", cursor: "pointer"}}>
                        <p style={{color: "red"}}>Se déconnecter</p>
                    </div>
                </div>
                </>
            : null}
        </>
    );
}

export default Profile;