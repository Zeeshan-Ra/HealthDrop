import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [c_password, setC_password] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        if (password !== c_password) {
            setPasswordError(true)
            return false
        } else {
            setPasswordError(false)
        }
        if (!email || !password || !name || !city || !address || !contact) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let response = await fetch("api/medshop", {
            method: "POST",
            body: JSON.stringify({ email, password, name, city, address, contact })
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("medShopKeeper", JSON.stringify(result));
            router.push("/medshop/dashboard");
        }
    }

    return (
        <>
            <h3 style={{ marginTop: 28 }}>REGISTER</h3>
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
                        passwordError ? <p className="input-error">Password and Confirm password not match</p> : null
                    }
                    {
                        error && !password ? <p className="input-error">Please enter valid password</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <input type="password" className="input-field" placeholder="Confirm your password" value={c_password} onChange={(e) => setC_password(e.target.value)} />
                    {
                        passwordError ? <p className="input-error">Password and Confirm password not match</p> : null
                    }
                    {
                        error && !c_password ? <p className="input-error">Please confirm password</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter Pharmacy Name" value={name} onChange={(e) => setName(e.target.value)} />
                    {
                        error && !name ? <p className="input-error">Please enter valid shop name</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                    {
                        error && !city ? <p className="input-error">Please enter valid city</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {
                        error && !address ? <p className="input-error">Please enter valid address</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter Contact No." value={contact} onChange={(e) => setContact(e.target.value)} />
                    {
                        error && !contact ? <p className="input-error">Please enter valid contact no.</p> : null
                    }
                </div>
                <div className="login-input-wrapper">
                    <button className="button" onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </>
    )
}

export default Signup;
