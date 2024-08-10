"use client"
import { useRouter } from 'next/navigation';

const TrPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the URL

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>This is a dynamic page with ID: {id}</p>
    </div>
  );
};

export default TrPage;
