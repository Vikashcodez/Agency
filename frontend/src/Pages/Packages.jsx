import { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/package/");
        setPackages(res.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center p-4">
      {packages.length === 0 ? (
        <p className="text-center text-xl font-bold mt-10">No packages available.</p>
      ) : (
        packages.map((pkg) => (
          <div key={pkg._id} className="max-w-sm m-4 bg-white rounded-lg shadow-md overflow-hidden">
            <img src={`http://localhost:5000/uploads/${pkg.thumbnail}`} alt={pkg.heading} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{pkg.heading}</h3>
              <p className="text-gray-600 mt-2">{pkg.description}</p>
              <p className="text-blue-500 font-bold mt-2">Price: RS{pkg.price}</p>
              <p className="text-green-500 font-semibold">{pkg.daysNights}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Packages;
