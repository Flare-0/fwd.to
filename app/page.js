import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
    <h1 className="text-4xl font-bold text-blue-700">if this is blue then tailwind is working</h1>
    <p className="mt-4 text-lg text-gray-600">This is the main page of your website.</p>
  </div>
  );
}
