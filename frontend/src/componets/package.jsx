import React, { useEffect, useState } from "react";
import sliderImg from "../assets/images/saling.png";
import sliderBg from "../assets/images/bg.jpg";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderSection = () => {
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    <section
      className="relative overflow-hidden pt-12 bg-cover bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${sliderBg})`, backgroundPosition: "bottom" }}
    >
      <div className="absolute bottom-250 left-0 right-0 flex justify-center overflow-hidden pointer-events-none">
        <img 
          src={sliderImg} 
          alt="Ship" 
          className="w-[300px] md:w-[450px] animate-slider opacity-100" 
        />
      </div>
      
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 pt-8 pb-20 z-10">
        <div className="flex justify-center mb-12">
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Our Packages</h2>
            <p className="text-blue-800 mt-2">Discover our exclusive sailing adventures</p>
          </div>
        </div>
        
        <div className="relative px-2 md:px-10 max-w-6xl mx-auto">
          {packages.length > 3 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-20 text-blue-900"
                aria-label="Previous package"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-20 text-blue-900"
                aria-label="Next package"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-16">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : packages.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white/90 rounded-lg shadow-lg">
                <p className="text-xl font-semibold text-gray-700">No packages available.</p>
              </div>
            ) : (
              getVisibleCards().map((pkg, index) => (
                <div 
                  key={pkg._id || index} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img 
                      src={`http://localhost:5000/uploads/${pkg.thumbnail}`} 
                      alt={pkg.heading} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      RS {pkg.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 truncate">{pkg.heading}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{pkg.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {pkg.daysNights}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes slider-move {
            0% { transform: translateX(-100%) translateY(5%) scaleX(1); }
            49% { transform: translateX(100%) translateY(-5%) scaleX(1); }
            50% { transform: translateX(101%) translateY(-5%) scaleX(-1); }
            99% { transform: translateX(-101%) translateY(5%) scaleX(-1); }
            100% { transform: translateX(-100%) translateY(5%) scaleX(1); }
          }
          .animate-slider {
            animation: slider-move 8s infinite ease-in-out;
          }
        `}
      </style>
    </section>
  );
};

export default SliderSection;