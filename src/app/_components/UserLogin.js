import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleLogin = async () => {
        console.log(email, password);
        let response = await fetch("api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if (props?.redirect?.order) {
                router.push('/cart')
            } else {
                router.push('/')
            }
        } else {
            alert("failed to login. Please try again")
        }
    }

    return (
        <div>
            <h3 style={{ marginTop: 135 }}>User Login</h3>
            <div className="login-input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-input-wrapper">
                <input className="input-field" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="login-input-wrapper">
                <button className="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default UserLogin;
