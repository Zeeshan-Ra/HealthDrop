"use client"
import { useEffect, useState } from "react";
import Footer from "../_components/Footer";
import dynamic from "next/dynamic"

const DynamicCustomerHeader = dynamic(()=> import("../_components/CustomerHeader"),{
    ssr: false
})

const Page = () => {

    const [myOrders, setMyOrders] = useState([])

    useEffect(() => {
        getMyOrders()
    }, [])
  
const getMyOrders = async () => {
        let userStorage = JSON.parse(localStorage.getItem('user'))
        let response = await fetch("http://localhost:3000/api/order?id=" + userStorage._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result)
        }
    }

    return (
        <div>
            <DynamicCustomerHeader />
            {
                myOrders.map((item) => (
                    <div className="medshop-wrapper" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 28}}>
                        <h4>Name : {item.data.name}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data.address}</div>
                        <div>Status: {item.status}</div>
                    </div>
                ))
            }
            <Footer />
        </div>
    )
}

export default Page;
