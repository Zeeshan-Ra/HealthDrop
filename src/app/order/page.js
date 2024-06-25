"use client"
import { useEffect, useState } from "react";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"

const DynamicCustomerHeader = dynamic(()=> import("../_components/CustomerHeader"),{
    ssr: false
})


const Page = () => {

    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')))
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total] = useState(() => cartStorage?.length == 1 ? Number(cartStorage[0].price) : cartStorage?.reduce((a, b) => {
        let x = a.price
        let num1 = +x
        let y = b.price
        let num2 = +y
        return num1 + num2
    }))

    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (!total) {
            router.push('/')
        }
    }, [total])
    
    useEffect(() => {
        let orderNow = async () => {
        let user_Id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem('user')).city;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let medItemsIds = cart.map((item) => item._id).toString()
        let medShop_id = cart[0].medshop_id;
        let deliveryBoyResponse = await fetch("http://localhost:3000/api/deliverypartners/" + city);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id)
        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)]
        if (!deliveryBoy_id) {
            alert("Delivery Partner not available")
            return false;
        }
    } ,[])

        let collection = {
            user_Id,
            medShop_id,
            medItemsIds,
            deliveryBoy_id,
            status: 'confirm',
            amount: total + DELIVERY_CHARGES + (total * TAX / 100)
        }
        
        let response = await fetch("http://localhost:3000/api/order", {
            method: 'POST',
            body: JSON.stringify(collection)
        })
        response = await response.json()
        if (response.success) {
            alert("order confirmed");
            setRemoveCartData(true);
            router.push('/myprofile')
        }
        else {
            alert("order failed")
        }

    }

    return (
        <div>
            <DynamicCustomerHeader removeCartData={removeCartData} />
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
