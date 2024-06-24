import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MedItemList = () => {
    const [medicines, setMedicines] = useState([]);
    const router = useRouter()

    useEffect(() => {
        loadMeds()
    }, [])

    const loadMeds = async () => {
        const medshopData = JSON.parse(localStorage.getItem("medShopKeeper"));
        let medshop_id = medshopData._id
        let response = await fetch("http://localhost:3000/api/medshop/medicines/" + medshop_id);
        response = await response.json();
        if (response.success) {
            setMedicines(response.result)
        } else {
            alert("Medicines list not loading")
        }
    }

    const deleteMed = async (id) => {
        let response = await fetch("http://localhost:3000/api/medshop/medicines/" + id, {
            method: "DELETE"
        })
        response = await response.json();
        if (response.success) {
            loadMeds()
        }
        else {
            alert("Medicine not deleted")
        }
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: 28 }}>Medicines</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>S. no.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        medicines.map((medicine, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{medicine.name}</td>
                                <td>₹ {medicine.price}</td>
                                <td>{medicine.description}</td>
                                <td><img src={medicine.img_path} alt="medicine image" className="medicine-image" /></td>
                                <td><span className="operation-link" onClick={() => router.push('dashboard/' + medicine._id)} >Edit </span>/<span className="operation-link" onClick={() => deleteMed(medicine._id)}> Delete</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MedItemList;