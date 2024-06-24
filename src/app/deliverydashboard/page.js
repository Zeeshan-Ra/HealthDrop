"use client"
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";
import Footer from "../_components/Footer";


const Page = () => {

    const router = useRouter();


    const [myOrders, setMyOrders] = useState([])

    useEffect(() => {
        getMyOrders()
    }, [])

    const getMyOrders = async () => {
        const deliveryData = JSON.parse(localStorage.getItem('delivery'))
        let response = await fetch("http://localhost:3000/api/deliverypartners/order/" + deliveryData._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result)
        }
    }

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (!delivery) {
            router.push('/deliverypartner')
        }
    }, [])

    return (
        <div>
            <DeliveryHeader />
            <h1 style={{ textAlign: 'center' }}>Delivery Dashboard</h1>
            {
                myOrders.map((item) => (
                    <div className="medshop-wrapper" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 28 }}>
                        <h4>Name : {item.data.name}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data.address}</div>
                        <div>Status: {item.status}</div>
                        <div className='containerStyle'>
                            Update Status:
                            <select className='selectStyle'>
                                <option>Confirm</option>
                                <option>On the way</option>
                                <option>Delivered</option>
                                <option>Failed to Deliver</option>
                            </select>
                        </div>
                    </div>
                ))
            }
            <Footer />
        </div>
    )
}

export default Page;