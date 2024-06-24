import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    let router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const handleLogin = async () => {
        console.log(email, password)
        if (!email || !password) {
            setError(true)
            return false
        }
        else {
            setError(false)
        }
        let response = await fetch("http://localhost:3000/api/medshop", {
            method: "POST",
            body: JSON.stringify({ email, password, login: true })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("medShopKeeper", JSON.stringify(result))
            router.push("/medshop/dashboard")
        } else {
            alert("Login failed")
        }
    }

    return (
        <>
            <h3 style={{ marginTop: 135 }}>LOGIN</h3>
            <div>
                <div className="login-input-wrapper">
                    <input type="email" className="input-field" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {
                        error && !email ? <p className="input-error">Please enter valid email</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <input type="password" className="input-field" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {
                        error && !password ? <p className="input-error">Please enter valid password</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login;