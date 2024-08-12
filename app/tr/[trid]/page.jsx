"use client"
import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../../firebaseConfig";  // Importing your firebaseConfig
import "./page.css"
import Header from '@/app/comp/Header'
import Footer from '@/app/comp/Footer'

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function Page({ params }) {
    const [clicks, setClicks] = useState([]);
    const [redirectURL, setRedirectURL] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const trackingID = params.trid;

    useEffect(() => {
        const db = getDatabase(app);
        const trackingRef = ref(db, `links/${trackingID}`);

        onValue(trackingRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const clicksArray = Object.values(data.clicks || {});
                setClicks(clicksArray);
                setRedirectURL(data.redirectURL);
                setCreatedAt(new Date(data.createdAt).toLocaleString());
            }
        });
    }, [trackingID]);

    return (
        <div>
            <Header />
            <div className="tridCont">
                <div className="splashTitle">
                    <p>Tracking Info</p>
                </div>

                <div className="linkInfo">
                    <div className="rowTable"> 
                        <div className="redirectURL">Redirect URL</div> 
                        <div className="redirectURLInfo"onClick={navigator.clipboard.writeText(redirectURL)}> {redirectURL}</div>
                    </div>
                    <div className="rowTable"> 
                        <div className="twoTHrreeFourcolone">Created at</div> 
                        <div className="twoTHrreeFourcoltwo">{createdAt}</div>
                    </div>
                    <div className="rowTable"> 
                        <div className="twoTHrreeFourcolone">Shortened link</div> 
                        <div className="twoTHrreeFourcoltwo">/{trackingID}</div>
                    </div>
                    <div className="rowTable"> 
                        <div className="fivecolone">Tracking ID</div> 
                        <div className="fivecoltwo">{trackingID}</div>
                    </div>
                </div>

                <div className="akdomcenter">
                    <div className="clickHeader">
                        <div className="time">Time</div>
                        <div className="ipadd">IP address</div>
                        <div className="useragent">User agent</div>
                    </div>
                    {clicks.map((click, index) => (
                        <div key={index} className="clickHeader">
                            <div className="time2">{new Date(click.timestamp).toLocaleString()}</div>
                            <div className="ipadd2">{click.ipAddress}</div>
                            <div className="useragent2">{click.userAgent}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
