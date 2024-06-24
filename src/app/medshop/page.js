"use client"
import "./style.css"
import { useState } from "react";
import Login from "../_components/Login";
import Signup from "../_components/Signup";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

const MedShop = () => {
    const [login, setLogin] = useState(true);
    const handleLogin =()=>{
        setLogin(!login)
    }
    return (
        <>
        <Header/>
        <div className="container">
        {
            login ? <Login/> : <Signup/>
        }
        <p style={{color:'gray', marginTop:15}}>{login ? "Do not have account?":"Already have account?"}<span style={{cursor:"pointer",color:'blue'}} onClick={handleLogin}>{login? " Signup" : " Login"}</span></p>
        </div>
        <Footer/>
        </>
    )
}

export default MedShop;