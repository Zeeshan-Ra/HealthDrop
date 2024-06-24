import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter()

    const handleSignup = async () => {
        let response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            body: JSON.stringify({ name, email, password, mobile, city, address })
        })
        response = await response.json();
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if (props?.redirect?.order) {
                router.push('/cart')
            } else {
                router.push('/')
            }
        }else{
            alert("failed")
        }
    }

    return (
        <div>
            <h3 style={{ marginTop: 28 }}>REGISTER</h3>
            <div className="login-input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="login-input-wrapper">
                <input className="input-field" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-input-wrapper">
                <input className="input-field" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="login-input-wrapper">
                <input className="input-field" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="login-input-wrapper">
                <input className="input-field" type="text" placeholder="Enter contact no." value={mobile} onChange={(e) => setMobile(e.target.value)} />
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
    )
}

export default UserSignup;