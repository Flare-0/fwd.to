"use client";
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update } from 'firebase/database';
import { firebaseConfig } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const fetchIpAddress = async () => {
    try {
        console.log("Fetching IP address...");
        const response = await fetch('https://api.ipify.org?format=json');
        console.log("IP response:", response);
        const data = await response.json();
        console.log("IP data:", data);
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown';
    }
};

export default function Page({ params }) {
    const [url, setUrl] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const router = useRouter();
    const linkID = params.li;

    useEffect(() => {
        const fetchData = async () => {
            if (isFetching) return; // Prevent additional fetches if already fetching

            setIsFetching(true);
            try {
                const dbRef = ref(db, `/links/${linkID}/redirectURL`);
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUrl(data);

                    const ipAddress = await fetchIpAddress();
                    const userData = {
                        timestamp: new Date().toISOString(),
                        ipAddress: ipAddress,
                        userAgent: navigator.userAgent
                    };

                    const clicksRef = ref(db, `/links/${linkID}/clicks/${Date.now()}`);
                    await update(clicksRef, userData);
                } else {
                    router.push('/404');
                }
            } catch (error) {
                console.error('Error getting data:', error);
                router.push('/404');
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [linkID, router]);

    useEffect(() => {
        if (url) {
            router.push(url);
        }
    }, [url, router]);

    return (
        <div>Loading...</div>
    );
}
