import React from 'react';
import { useRef, useState } from 'react';
import {FaTimes} from "react-icons/fa";
import GoogleButton from "react-google-button"
import {useNavigate} from 'react-router-dom'
import "../styles/connexion.css";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
// CLient ID : 304277781281-895c14frohac9d0ccivohfde3edla345.apps.googleusercontent.com
// Code client secret : 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


function Connexion() {
    const navRef = useRef();
    const [data, setData] = useState({
        email: "",
        password : "",
      })

    const navigate = useNavigate(); 

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    function handleClick_regis () {
        navigate("../Register")
    }

    function handleClick_accueil () {
        navigate("../")
    }  
    
    function handleClick_home () {
        navigate("../Home")
    }

    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    },
                })
                handleClick_home()

                console.log(res.data["name"])
                console.log(res.data["email"])
            } catch (err) {
                console.log(err)

            }

        }
      });

      function submit(e) {
        e.preventDefault();
        console.log("email: " + data.email + " password: " + data.password)
        axios.post("https://area-backend-v1.herokuapp.com/Login", {
        username : data.username,
        password : data.password,
        email: data.email
        
        }).then(res=> {
        if (res.data["message"] === "Account created successfully") {
            console.log("YESSSSSSSSSSSSS");
            localStorage.setItem("_token", JSON.stringify(res.data["_token"]))
            handleClick_home()
        }
        console.log(res.data["message"])
        }).catch(error=> {
        console.log('response: ', error.response.data["message"]);
        })
    }

    function handle(e) {
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
      }

    return (
        <>
        <header>
            <img src={require("../assets/area2.png")} alt="" onClick={(e)=>handleClick_accueil()}/>
            <nav ref={navRef}>
                <a href='/#'>Vous êtes nouveau ?</a>
                <button className='connect' onClick={(e)=>handleClick_regis()}>Inscrivez-vous</button>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
        </header>
        <section>
            <div className='register'>
                <div className='col1'>
                    <img src={require("../assets/cloud.png")} alt=""/>
                    <h1>Connexion</h1>
                </div>
                <div className='col2'>
                    <form id='form' className='flex col' onSubmit={(e) => submit(e)} method="post">
                        <input onChange={(e)=> handle(e)} id="email" value={data.email} type="email" placeholder='Email'></input>
                        <input onChange={(e)=> handle(e)} id="password" value={data.password} type="password" placeholder='Mot de passe'></input>
                        <a href="/#">Mot de passe oublié ?</a>
                        <GoogleButton style={{width: 320}} type="light" onClick={login} />
                        <button className='btn'>Connectez-vous</button>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
}

export default Connexion;