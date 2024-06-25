"use client"
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";


const Page = () => {

    const [cartStorage, setCartStorage] = useState(localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')));
    const router = useRouter()
    const [total] = useState(() => cartStorage.length == 1 ? Number(cartStorage[0].price) : cartStorage.reduce((a, b) => {
        let x = a.price
        let num1 = +x
        let y = b.price
        let num2 = +y
        return num1 + num2
    }))

    const orderNow = () => {
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order')
        }
        else {
            router.push('/user-auth?order=true')
        }
    }

    return (
        <div>
            <CustomerHeader />
            <div className="medicine-wrapper">
                {
                    cartStorage.length > 0 ? cartStorage.map((medicine, i) => (
                        <div className="medicine-item" key={i}>
                            <div><img style={{ width: 100 }} src={medicine.img_path} alt="medicine" /></div>
                            <div className="med-details-wrapper">
                                <div>{medicine.name}</div>
                                <div className="med-description">{medicine.description}</div>
                                <div style={{ color: '#1A2421' }}><span style={{ color: 'red' }}>Price: </span>₹ {medicine.price}</div>
                                {
                                    <button onClick={() => removeFromCart(medicine._id)}>Remove from cart</button>
                                }
                            </div>

                        </div>
                    )) : <h1>No Medicine Available</h1>
                }
            </div>
            <div className="total-price-wrapper">
                <div className="block-1">
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
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;
