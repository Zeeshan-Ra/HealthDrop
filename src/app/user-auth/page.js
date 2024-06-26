"use client"
import { useState } from "react";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import UserSignup from "../_components/UserSignup";
import dynamic from "next/dynamic"

const DynamicCustomerHeader = dynamic(()=> import("../_components/CustomerHeader"),{
    ssr: false
})

const Page = (props) => {

    const [login, setLogin] = useState(true);

    const handleLogin = () => {
        setLogin(!login)
    }

    return (
        <div>
            <DynamicCustomerHeader />
            <div className="container">
            {
                login ?
                    <UserLogin redirect={props.searchParams} /> :
                        <UserSignup redirect={props.searchParams} />
            }
            <p style={{color:'gray', marginTop:15}}>{login ? "Do not have account?":"Already have account?"}<span style={{cursor:"pointer",color:'blue'}} onClick={handleLogin}>{login? " Signup" : " Login"}</span></p>
            </div>
            <Footer />
        </div>
    )
}

export default Page;
