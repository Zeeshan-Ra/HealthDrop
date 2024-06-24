"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(null);
    const [cartStorage, setCartStorage] = useState(null);
    const [total, setTotal] = useState(null);
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Access localStorage only in useEffect
        const user = localStorage.getItem('user');
        const cart = localStorage.getItem('cart');

        if (user) {
            setUserStorage(JSON.parse(user));
        }

        if (cart) {
            const parsedCart = JSON.parse(cart);
            setCartStorage(parsedCart);
            const cartTotal = parsedCart.length === 1 
                ? Number(parsedCart[0].price) 
                : parsedCart.reduce((a, b) => Number(a.price) + Number(b.price));
            setTotal(cartTotal);
        }

        if (!user || !cart || !total) {
            router.push('/');
        }
    }, [total, router]);

    const orderNow = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (!user || !cart) {
            alert("User or cart data not found");
            return;
        }

        const user_Id = user._id;
        const city = user.city;
        const medItemsIds = cart.map((item) => item._id).toString();
        const medShop_id = cart[0].medshop_id;
        
        let deliveryBoyResponse = await fetch("http://localhost:3000/api/deliverypartners/" + city);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        
        const deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);
        const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
        
        if (!deliveryBoy_id) {
            alert("Delivery Partner not available");
            return false;
        }

        const collection = {
            user_Id,
            medShop_id,
            medItemsIds,
            deliveryBoy_id,
            status: 'confirm',
            amount: total + DELIVERY_CHARGES + (total * TAX / 100)
        };
        
        let response = await fetch("http://localhost:3000/api/order", {
            method: 'POST',
            body: JSON.stringify(collection)
        });
        response = await response.json();
        
        if (response.success) {
            alert("Order confirmed");
            setRemoveCartData(true);
            router.push('/myprofile');
        } else {
            alert("Order failed");
        }
    }

    if (!userStorage || !cartStorage || total === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="total-price-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name: </span>
                        <span>{userStorage.name}</span>
                    </div>
                    <div className="row">
                        <span>Address: </span>
                        <span>{userStorage.address}</span>
                    </div>
                    <div className="row">
                        <span>Contact: </span>
                        <span>{userStorage.mobile}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Medicines Price: </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row" style={{ borderTop: '2px solid red', paddingTop: 4, marginTop: 12 }}>
                        <span>Total Amount: </span>
                        <span>₹ {total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                    <h2>Payment Method</h2>
                    <div className="row">
                        <span>Cash on Delivery </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;