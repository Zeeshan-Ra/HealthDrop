"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = () => {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        const getMyOrders = async () => {
            const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
            if (userStorage) {
                try {
                    const response = await fetch(`http://localhost:3000/api/order?id=${userStorage._id}`);
                    const data = await response.json();
                    if (data.success) {
                        setMyOrders(data.result);
                    } else {
                        console.error('Error fetching orders:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };
        getMyOrders();
    }, []);

    return (
        <div>
            <CustomerHeader />
            {myOrders.length > 0 ? (
                myOrders.map((item, index) => (
                    <div className="medshop-wrapper" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 28 }} key={index}>
                        <h4>Name: {item.data?.name}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data?.address}</div>
                        <div>Status: {item.status}</div>
                    </div>
                ))
            ) : (
                <div>No orders found.</div>
            )}
            <Footer />
        </div>
    );
};

export default Page;
