import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Anchor, Calendar, Wind, MapPin } from "lucide-react";
import axios from "axios";

const FlippingProductCards = () => {
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch packages from the database
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/package/");
        setPackages(res.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === packages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? packages.length - 1 : prevIndex - 1
    );
  };

  const getVisibleCards = () => {
    if (packages.length <= 3) return packages;
    
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % packages.length;
      cards.push(packages[index]);
    }
    return cards;
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <div className="flex justify-center mb-12">
        <div className="relative text-center">
          <h2 className="text-4xl font-bold text-blue-900 drop-shadow-sm">Our Packages</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-2 mb-3 rounded-full"></div>
          <p className="text-blue-800 text-lg font-medium">Discover our exclusive sailing adventures</p>
        </div>
      </div>

      <div className="relative px-2 md:px-10 max-w-6xl mx-auto">
        {packages.length > 3 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 p-3 rounded-full shadow-lg z-20 text-blue-900 transition-all duration-300 hover:scale-110"
              aria-label="Previous package"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 p-3 rounded-full shadow-lg z-20 text-blue-900 transition-all duration-300 hover:scale-110"
              aria-label="Next package"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        <div className="flex flex-wrap gap-8 justify-center">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : packages.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-gray-700">No packages available.</p>
            </div>
          ) : (
            getVisibleCards().map((pkg, index) => (
              <div
                key={pkg._id || index}
                className="group relative w-80 h-96 cursor-pointer [perspective:1000px]"
              >
                <div
                  className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* Front - Photo, Package Name, and Price */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={`http://localhost:5000/uploads/${pkg.thumbnail}`}
                        alt={pkg.heading}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/600/400"; // Fallback image
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            RS {pkg.price}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white drop-shadow-md">{pkg.heading}</h2>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <Anchor size={18} className="mr-2 text-blue-600" />
                        Package Highlights
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        {pkg.highlights?.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-2 font-bold">✓</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 flex justify-center">
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center">
                          <span className="mr-1">Hover to see details</span>
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
  
                  {/* Back - Package Details, Days, and Book Button */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-xl shadow-xl p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">{pkg.heading}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {pkg.daysNights}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Wind size={14} className="mr-1" />
                        {pkg.difficulty || 'Moderate'}
                      </span>
                    </div>
                    
                    <div className="flex items-start mb-2">
                      <MapPin size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-sm line-clamp-6">
                        {pkg.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-2">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">RS {pkg.price}</span>
                        <span className="text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded-lg">
                          {pkg.duration || '7 days'}
                        </span>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg flex items-center justify-center">
                        Book Now
                        <ChevronRight size={18} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlippingProductCards;