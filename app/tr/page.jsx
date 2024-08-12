"use client"
import Header from "../comp/Header"
import Footer from "../comp/Footer";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {

  const [value, setValue] = useState("")
  const router = useRouter(); 
  const handleChange = (event) => {setValue(event.target.value);}
  const handleSubmit = (e) => {
    e.preventDefault();
    if(value){
    router.push(`/tr/${value}`)}
  };
  
  return (
    <>
      <Header />

      <div className="homePage">
        <div className="center">
        <form className="homepageForm" onSubmit={handleSubmit}>

            <input value={value} onChange={handleChange}  className="input1" placeholder="Enter Tracking id" />
            <div className="submit">

              <img onClick={handleSubmit} className="arrowImg" src="https://raw.githubusercontent.com/Flare-0/fwd.to/main/public/arrow.svg" />

            </div>
          </form>
        </div>
      </div>


      <Footer />
    </>
  );
}
