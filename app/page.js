"use client";
import styles from "./page.module.css";
import { initializeApp } from "firebase/app";
import Header from "./comp/Header.jsx";
import Footer from "./comp/Footer";
import { useState } from "react";
import { getDatabase, ref, set, get, child, serverTimestamp } from 'firebase/database';
import { firebaseConfig } from "./firebaseConfig";
import { useRouter } from 'next/navigation';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase();

export default function Home() {
  const [homepageFormVal, setHomepageFormVal] = useState("");
  const router = useRouter();

  function generateAlphanumericKey(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async function isKeyUnique(key) {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `links/${key}`));
    return !snapshot.exists();
  }

  async function createLinkRecord(redirectURL) {
    try {
      new URL(redirectURL); // Validate URL
    } catch {
      console.log("Invalid URL. The link record was not created.");
      return null;
    }

    let key;
    let isUnique = false;
    while (!isUnique) {
      key = generateAlphanumericKey();
      isUnique = await isKeyUnique(key);
    }

    const newLinkRecord = {
      redirectURL: redirectURL,
      createdAt: serverTimestamp(),
      clicks: {}
    };

    await set(ref(db, `links/${key}`), newLinkRecord);
    console.log(`New link record created with key: ${key}`);
    return key; // Return the generated key
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const linkToShorten = e.target.elements[0].value;
    const key = await createLinkRecord(linkToShorten);

    if (key) {
      router.push(`/tr/${key}`); // Navigate to the new URL with the key
      e.target.reset(); // Clear the form input
    }
  };

  return (
    <>
      <Header />
      <div className="homePage">
        <div className="center">
          <form className="homepageForm" onSubmit={handleSubmit}>
            <input
              className="input1"
              placeholder="Enter link to shorten"
              type="text"
            />
            <div
              className="submit"
              onClick={() => handleSubmit({ preventDefault: () => {}, target: document.querySelector('.homepageForm') })}
            >
              <img
                className="arrowImg"
                src="https://raw.githubusercontent.com/Flare-0/fwd.to/main/public/arrow.svg"
                alt="Submit"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
