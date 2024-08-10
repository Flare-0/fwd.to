import styles from "./page.module.css";
import { initializeApp } from "firebase/app";
import Header from "./comp/Header.jsx"
import Footer from "./comp/Footer";
export default function Home() {


  return (
    <>
      <Header />
      <div className="homePage">
        <div className="center">
          <form >
            <input className="input1" placeholder="Enter link to shorten" />
            <div className="submit">
              <img className="arrowImg" src="https://raw.githubusercontent.com/Flare-0/fwd.to/main/public/arrow.svg"/>
            </div>
          </form>
        </div>
      </div>


      <Footer />
    </>
  );
}
