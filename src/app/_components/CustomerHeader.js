"use client"
import Link from "next/link";
import "../medshop/style.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomerHeader = (props) => {
    const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
    const [cartNumber, setCartNumber] = useState(cartStorage?.length)
    const [cartItem, setCartItem] = useState(cartStorage)
    const [user, setUser] = useState(userStorage ? userStorage : undefined);
    const router = useRouter();



    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0].medshop_id != props.cartData.medshop_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData])
                    localStorage.setItem('cart', JSON.stringify([props.cartData]))
                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1)
                    localStorage.setItem('cart', JSON.stringify(localCartItem))
                }

            } else {
                setCartNumber(1);
                setCartItem([props.cartData])
                localStorage.setItem('cart', JSON.stringify([props.cartData]))
            }
        }

    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removeCartData
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem));
            if (localCartItem.length == 0) {
                localStorage.removeItem('cart')
            }
        }
    }, [props.removeCartData]);

    const logout = () => {
        localStorage.removeItem('user');
        router.push('/')
        setUser(false)

    }

    useEffect(()=>{
        if(props.removeCartData){
            setCartItem([]);
            setCartNumber(0);
            localStorage.removeItem('cart');
            
        }
    },[props.removeCartData])

    return (
        <div className="header-wrapper">
            <div className="logo" onClick={()=>router.push('/')} style={{cursor: 'pointer'}}>
                <img style={{ width: 58 }} src="/images/78028744.png" alt="logo" />
                <h4>HealthDrop</h4>
            </div>
            <ul>
                {
                    user ?
                        <>
                            <li>
                                <Link href={"/myprofile"}>{user?.name}</Link>
                            </li>
                            <li>
                                <Link href={"/medshop"}>Add Pharmacy</Link>
                            </li>
                            <li>
                                <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                            </li>
                            <li>
                                <Link href={'/deliverypartner'}>Delivery</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </> :
                        <>
                            <li>
                                <Link href={"/user-auth"}>LOGIN</Link>
                            </li>
                            <li>
                                <Link href={"/medshop"}>Add Pharmacy</Link>
                            </li>
                            <li>
                                <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                            </li>
                            <li>
                                <Link href={'/deliverypartner'}>Delivery</Link>
                            </li>
                        </>
                }
            </ul>
        </div>
    )
}

export default CustomerHeader;