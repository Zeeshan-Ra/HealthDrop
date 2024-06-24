"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import UserSignup from "../_components/UserSignup";

const Page = ({ searchParams }) => {
    const [login, setLogin] = useState(true);

    const handleLogin = () => {
        setLogin(!login);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userLoggedIn = localStorage.getItem('userLoggedIn');
            setLogin(userLoggedIn === 'true');
        }
    }, []);

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
                    {login ? "Do not have an account?" : "Already have an account?"}
                    <span style={{ cursor: "pointer", color: 'blue' }} onClick={handleLogin}>
                        {login ? " Sign up" : " Log in"}
                    </span>
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
