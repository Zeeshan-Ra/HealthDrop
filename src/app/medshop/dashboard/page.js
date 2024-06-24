"use client"
import Header from "@/app/_components/Header";
import "./../style.css"
import AddMeds from "@/app/_components/AddMeds";
import { useState } from "react";
import MedItemList from "@/app/_components/MedItemList";

const Dashboard =() => {
    const [addItem, setAddItem] = useState(false);
    return(
        <div>
            <Header/>
            <div className="btn">
            <button onClick={()=>setAddItem(true)}>Add Medicines</button>
            <button onClick={()=>setAddItem(false)}>Dashboard</button>
            </div>
            {
                addItem ? <AddMeds setAddItem={setAddItem}/> : <MedItemList/>
            }
            
        </div>
    )
}

export default Dashboard;