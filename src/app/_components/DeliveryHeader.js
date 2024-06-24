"use client"
import Link from "next/link";
import "../medshop/style.css";
import { useRouter } from "next/navigation";

const DeliveryHeader = (props) => {
    const router = useRouter();

    return (
        <div className="header-wrapper">
            <div className="logo" onClick={()=>router.push('/')} style={{cursor: 'pointer'}}>
                <img style={{ width: 58 }} src="/images/78028744.png" alt="logo" />
                <h4>HealthDrop</h4>
            </div>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default DeliveryHeader;