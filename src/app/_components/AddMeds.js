import { useState } from "react";

const AddMeds = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const addMedItem = async () => {
        console.log(name, price, path, description);
        if (!name || !price || !path || !description) {
            setError(true);
            return false
        }
        else {
            setError(false)
        }
        let medshop_id;
        const medicineData = JSON.parse(localStorage.getItem("medShopKeeper"))
        if (medicineData) {
            medshop_id = medicineData._id
        }
        let response = await fetch("http://localhost:3000/api/medshop/medicines", {
            method: "POST",
            body: JSON.stringify({ name, price, img_path: path, description, medshop_id })
        })
        response = await response.json();
        if (response.success) {
            alert("Medicine added");
            props.setAddItem(false)

        }else{
            alert("Medicine not added")
        }
    }

    return (
        <div className="container">
            <h1 style={{ marginTop: 88 }}>Add Medicines</h1>
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
                <button className="button" onClick={addMedItem}>Add Medicine</button>
            </div>
        </div>
    )
}

export default AddMeds;