"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowocation] = useState(false);
  const [medshops, setMedshops] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadMedshop();
  }, [])

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result)
    }
  }

  const handleCityList = (item) => {
    setSelectedLocation(item);
    setShowocation(false)
    loadMedshop({location:item})
  }

  const loadMedshop = async (params) => {
    let url = "http://localhost:3000/api/customer"
    if(params?.location){
      url = url+"?location="+params.location;
    }else if(params?.medshop){
      url = url+"?medshop="+params.medshop;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setMedshops(response.result)
    }
  }

  return (
    <main >
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Buy Your Medicines</h1>
        <div className="input-wrapper">
          <input type="text" className="select-input" placeholder="Select Location" value={selectedLocation} onClick={() => setShowocation(true)} />
          <ul className="location-list">
            {
              showLocation && locations.map((item, i) => (
                <li key={i} onClick={() => handleCityList(item)}>{item}</li>
              ))
            }
          </ul>
          <input type="text" className="search-input" placeholder="Search medicine or pharmacy" onChange={(e)=>loadMedshop({medshop:e.target.value})} />
        </div>
      </div>
      <div className="medshop-list-container">
        {
          medshops.map((item, i) => (
            <div key={i} onClick={()=>router.push("explore/"+item.name+"?id="+item._id)} className="medshop-wrapper">
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contact: {item.contact}</h5>
              </div>
              <div className="address-wrapper">
                  <div>City: {item.city}</div>
                  <div>Address: {item.address}</div>
                  <div>Email: {item.email}</div>

              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
