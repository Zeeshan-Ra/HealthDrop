"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const router = useRouter();
    const pathName = usePathname()
    const [details, setDetails] = useState();

    useEffect(() => {
        let data = localStorage.getItem("medShopKeeper");
        if (!data && pathName=="/medshop/dashboard") {
            router.push('/medshop')
        } else if(data && pathName=="/medshop"){
            router.push("/medshop/dashboard")
        }
        else {
            setDetails(JSON.parse(data))
        }
    }, []);

    const logout =()=>{
        localStorage.removeItem("medShopKeeper");
        router.push("/medshop")
    }

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 58 }} src="/images/78028744.png" alt="logo" />
                <h4>HealthDrop</h4>
            </div>
            <ul>
                <li>
                    <Link href={"/"}>HOME</Link>
                </li>
                {
                    details && details.name ? <>
                    <li>
                        <Link href={"/"}>PROFILE</Link>
                    </li>
                    <li><button onClick={logout}>Logout</button></li>
                    </> :
                        <li>
                            <Link href={"/medshop"}>LOGIN/SIGNUP</Link>
                        </li>
                }
            </ul>
        </div>
    )
}

export default Header;