"use client"
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useEffect, useState } from "react";

const Page = (props) => {
    const name = props.params.name;
    const [medShopDetails, setMedShopDetails] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cartIds, setCartIds] = useState(cartStorage?()=>cartStorage.map((item)=>{
        return item._id
    }):[]);
    const [removeCartData, setRemoveCartData] = useState()


    useEffect(()=>{
        loadMedShopDetail()
    },[])

    const loadMedShopDetail = async () => {
        const id = props.searchParams.id
        let  response = await fetch("http://localhost:3000/api/customer/"+id);
        response = await response.json();
        if(response.success){
            setMedShopDetails(response.result);
            setMedicines(response.medicines)
        }
    }

    const addToCart = (item) => {
        setCartData(item)
        let localCartIds = cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds);
        setRemoveCartData();
    }

    const removeFromCart = (id) =>{
        setRemoveCartData(id);
        var localIds = cartIds.filter(item => item!=id);
        setCartData()
        setCartIds(localIds);
    }

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div className="medshop-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="detail-wrapper">
                <h3>Contact: {medShopDetails?.contact}</h3>
                <h3>City: {medShopDetails?.city}</h3>
                <h3>Address: {medShopDetails?.address}</h3>
                <h3>Email: {medShopDetails?.email}</h3>
            </div>
            <div className="medicine-wrapper">
            {
                medicines.length>0 ? medicines.map((medicine,i) => (
                    <div className="medicine-item" key={i}>
                        <div><img style={{width: 100}} src={medicine.img_path} alt="medicine" /></div>
                        <div className="med-details-wrapper">
                        <div>{medicine.name}</div>
                        <div style={{color:'#1A2421'}}>₹ {medicine.price}</div>
                        <div className="med-description">{medicine.description}</div>
                        {
                            cartIds.includes(medicine._id) ? <button onClick={()=>removeFromCart(medicine._id)}>Remove from cart</button> : <button onClick={()=>addToCart(medicine)}>Add to cart</button>
                        }
                        
                        
                        </div>
                        
                    </div>
                )) : <h1>No Medicine Available</h1>
            }
            </div>
            <Footer />
        </div>
    )
}

export default Page;