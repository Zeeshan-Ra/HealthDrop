"use client"
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {

    const [login, setLogin] = useState(true);
    const router = useRouter()

    //Login
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Signup
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    useEffect(()=>{
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if(delivery){
            router.push('/deliverydashboard')
        }
    },[])

    const handleLogin = async () => {
        console.log(loginMobile, loginPassword);
        let response = await fetch("api/deliverypartners/login", {
            method: "POST",
            body: JSON.stringify({ mobile:loginMobile, password:loginPassword })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard')
        } else {
            alert("failed to login. Please try again")
        }
    }

    const handleSignup = async () => {
        let response = await fetch("api/deliverypartners/signup", {
            method: "POST",
            body: JSON.stringify({ name, mobile, password, city, address })
        })
        response = await response.json();
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard')
        }else{
            alert("failed")
        }
    }

    const handleLoginSignup = () => {
        setLogin(!login)
    }

    return (
        <div>
            <DeliveryHeader />
            <div className="container">
                {
                    login ? <div>
                        <h3 style={{ marginTop: 135 }}>User Login</h3>
                        <div className="login-wrapper">
                            <div className="login-input-wrapper">
                                <input className="input-field" type="text" placeholder="Enter Mobile" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="password" placeholder="Enter Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <button className="button" onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    </div> :
                        <div>
                            <h3 style={{ marginTop: 28 }}>REGISTER</h3>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="text" placeholder="Enter contact no." value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <input className="input-field" type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="login-input-wrapper">
                                <button className="button" onClick={handleSignup}>Sign Up</button>
                            </div>
                        </div>
                }
                <p style={{ color: 'gray', marginTop: 15 }}>{login ? "Do not have account?" : "Already have account?"}<span style={{ cursor: "pointer", color: 'blue' }} onClick={handleLoginSignup}>{login ? " Signup" : " Login"}</span></p>
            </div>
        </div>
    )
}

export default Page;
