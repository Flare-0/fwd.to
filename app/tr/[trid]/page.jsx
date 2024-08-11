"use client"
import React from 'react'
import "./page.css"
import Header from '@/app/comp/Header'
import Footer from '@/app/comp/Footer'
export default function page({params}) {
    const trackingID = params.trid
  return (

    <div>
        <Header />
        <div className="tridCont">

            <div className="splashTitle">
                <p>Tracking Info</p>
            </div>

            <div className="linkInfo">
                <div className="rowTable"> <div className="redirectURL"></div> <div className="redirectURLInfo"></div> </div>
            </div>



        </div>
      <Footer />
    </div>
  )
}
