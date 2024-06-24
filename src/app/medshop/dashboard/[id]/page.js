"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditMeds = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        handleLoadMeds()
    },[]);

    const handleLoadMeds = async () => {
        let response = await fetch("http://localhost:3000/api/medshop/medicines/edit/"+props.params.id);
        response = await response.json();
        if(response.success){
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description)
        }
    }

    const handleEditMed = async () => {
        if (!name || !price || !path || !description) {
            setError(true);
            return false
        }
        else {
            setError(false)
        }
        let response = await fetch("http://localhost:3000/api/medshop/medicines/edit/"+props.params.id, {
            method:"PUT",
            body: JSON.stringify({name, price, img_path:path, description})
        })
        response = await response.json();
        if(response.success){
            router.push("../dashboard")
        }else{
            alert("Data not updated. Try again")
        }
    }

    return (
        <div className="container">
            <h1 style={{ marginTop: 88 }}>Update Medicine</h1>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Medicine Name" value={name} onChange={(e) => setName(e.target.value)} />
                {
                    error && !name ? <p className="input-error" style={{marginTop:0, left:72}}>Please enter valid name</p> : null
                }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                {
                    error && !price ? <p className="input-error" style={{marginTop:0, left:72}}>Please enter valid price</p> : null
                }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Image Path" value={path} onChange={(e) => setPath(e.target.value)} />
                {
                    error && !path ? <p className="input-error" style={{marginTop:0, left:72}}>Please enter valid path</p> : null
                }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                {
                    error && !description ? <p className="input-error" style={{marginTop:0, left:72}}>Please enter valid description</p> : null
                }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleEditMed}>Update Medicine</button>
            </div>
            <div className="input-wrapper">
                <p style={{textDecoration:'underline', color:'blue', cursor:'pointer'}} onClick={()=>router.push('../dashboard')}>Back to Medicine List</p>
            </div>
        </div>
    )
}

export default EditMeds;