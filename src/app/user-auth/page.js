"use client"
import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import UserSignup from "../_components/UserSignup";

const Page = ({ searchParams }) => {
    const [login, setLogin] = useState(true);

    const handleLogin = () => {
        setLogin(!login);
    };

    return (
        <div>
            <CustomerHeader />
            <div className="container">
                {login ? (
                    <UserLogin redirect={searchParams} />
                ) : (
                    <UserSignup redirect={searchParams} />
                )}
                <p style={{ color: 'gray', marginTop: 15 }}>
                    {login ? "Do not have account?" : "Already have account?"}
                    <span style={{ cursor: "pointer", color: 'blue' }} onClick={handleLogin}>
                        {login ? " Signup" : " Login"}
                    </span>
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Page;