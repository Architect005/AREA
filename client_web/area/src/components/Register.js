import React from 'react';
import { useRef, useState} from 'react';
import {FaTimes} from "react-icons/fa";
import GoogleButton from "react-google-button"
import {useNavigate} from 'react-router-dom'
import "../styles/register.css";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Register() {
    const navRef = useRef();
    const [data, setData] = useState({
        username : "",
        email:"",
        password : "",
        passwordConfirm : ""
      })

    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();
        console.log("username" + data.username + " password" + data.password + " email" + data.email )
        if (data.password !== data.passwordConfirm)
            console.log("Wrong!!!!")
        else {
            axios.post("https://area-backend-v1.herokuapp.com/Register", {
            username : data.username,
            password : data.password,
            email: data.email
            
            }).then(res=> {
            if (res.data["message"] === "Account created successfully") {
                console.log("YESSSSSSSSSSSSS");
                localStorage.setItem("_token", JSON.stringify(res.data["_token"]))
                console.log(JSON.parse(localStorage.getItem("_token")))
                handleClick_home()
            }
            console.log(res.data["message"])
            }).catch(error=> {
            console.log('response: ', error.response.data["message"]);
            })
        }
    }

    function handleClick_con () {
        navigate("../Connexion")
    }

    function handleClick_home () {
        navigate("../Home")
    }
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }
    // const back = new URL("../assets/background.png", import.meta.url)
    
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

    function handle(e) {
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <>
        <header>
            <img src={require("../assets/area2.png")} alt="" />
            <nav ref={navRef}>
                <a href="/#">Déjà un compte ?</a>
                <button className='connect' onClick={(e)=>handleClick_con()}>Connectez-vous</button>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
        </header>
        <section>
            <div className='register'>
                <div className='col1'>
                    <img src={require("../assets/cloud.png")} alt="" />
                    <h1>Inscription</h1>
                </div>
                <div className='col2'>
                    <form id='form' className='flex col' onSubmit={(e) => submit(e)} method="post">
                        <input onChange={(e)=> handle(e)} id="username" value={data.username} type="text" placeholder='Nom' required></input>
                        <input onChange={(e)=> handle(e)} id="email" value={data.email} type="email" placeholder='Email' required></input>
                        <input onChange={(e)=> handle(e)} id="password" value={data.password} type="password" placeholder='Mot de passe' required></input>
                        <input onChange={(e)=> handle(e)} id="passwordConfirm" value={data.passwordConfirm} type="password" placeholder='Confirmez le mot de passe' required></input>
                        <GoogleButton style={{width: 320}} type="light" onClick={login} />
                        <button className='btn' /*onClick={(e)=>handleClick_home()}*/>Inscrivez-vous</button>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
}

export default Register;
