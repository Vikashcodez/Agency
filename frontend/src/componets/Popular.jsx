import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PopularLocationsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const locationRefs = useRef([]);
  const backgroundRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize ref arrays
  locationRefs.current = [];
  backgroundRefs.current = [];

  const addLocationRef = (el) => {
    if (el && !locationRefs.current.includes(el)) {
      locationRefs.current.push(el);
    }
  };

  const addBackgroundRef = (el) => {
    if (el && !backgroundRefs.current.includes(el)) {
      backgroundRefs.current.push(el);
    }
  };

  // Location data with your original images
  const locations = [
    {
      id: 1,
      name: "Radhanagar Beach",
      highlight: "Asia's Best Beach",
      description: "Voted as Asia's best beach, Radhanagar offers pristine white sand and turquoise waters perfect for swimming and sunset views.",
      image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2094&q=80",
      features: ["Pristine White Sand", "Turquoise Waters", "Spectacular Sunsets"]
    },
    {
      id: 2,
      name: "Ross Island",
      highlight: "Historical Gem",
      description: "Once the administrative headquarters of the British, now a picturesque ruin with peacocks and deer roaming freely among colonial architecture.",
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      features: ["Colonial Architecture", "Wildlife", "Historical Site"]
    },
    {
      id: 3,
      name: "Havelock Island",
      highlight: "Diving Paradise",
      description: "The most visited island with world-class diving spots, vibrant coral reefs, and laid-back beach vibes perfect for underwater adventures.",
      image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1933&q=80",
      features: ["Scuba Diving", "Coral Reefs", "Beach Activities"]
    },
    {
      id: 4,
      name: "Baratang Island",
      highlight: "Natural Wonder",
      description: "Famous for its limestone caves, mangrove creeks, and the fascinating mud volcanoes that create a unique landscape unlike anywhere else.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["Limestone Caves", "Mangrove Forests", "Mud Volcanoes"]
    }
  ];

  useEffect(() => {
    // Set loaded state after a brief delay for animation purposes
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
    // Calculate total section height based on number of locations
    const sectionHeight = window.innerHeight * (locations.length + 0.5);
    if (sectionRef.current) {
      sectionRef.current.style.minHeight = `${sectionHeight}px`;
    }

    // Pin the heading within the section
    const headingTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${sectionHeight - window.innerHeight}`,
      pin: headingRef.current,
      pinSpacing: false
    });

    // Create scroll triggers for each location
    const locationTriggers = locationRefs.current.map((location, index) => {
      return ScrollTrigger.create({
        trigger: location,
        start: "top center",
        end: "bottom center",
        onEnter: () => handleLocationChange(index),
        onEnterBack: () => handleLocationChange(index)
      });
    });

    // Helper function for background transitions
    const handleLocationChange = (index) => {
      setActiveIndex(index);

      // Fade out all backgrounds
      gsap.to(backgroundRefs.current, { 
        opacity: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut"
      });

      // Fade in and scale up active background
      gsap.to(backgroundRefs.current[index], { 
        opacity: 1,
        scale: 1.05,
        duration: 1.2,
        ease: "power2.out"
      });

      // Parallax effect for active background
      gsap.fromTo(
        backgroundRefs.current[index],
        { y: "20px" },
        { y: "-20px", duration: 2, ease: "sine.inOut" }
      );
    };

    // Initial background setup
    if (backgroundRefs.current.length > 0) {
      gsap.set(backgroundRefs.current, { opacity: 0 });
      gsap.set(backgroundRefs.current[0], { opacity: 1 });
    }

    // Initial animations
    gsap.from(headingRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3
    });

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (headingTrigger) headingTrigger.kill();
      locationTriggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Popular Travel Destinations"
    >
      {/* Background images with 3D parallax effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {locations.map((location, index) => (
          <div
            key={`bg-${location.id}`}
            ref={addBackgroundRef}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1500 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url(${location.image})`,
              transformOrigin: 'center',
              transform: 'scale(1.05)'
            }}
          >
            {/* Overlay gradient for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
            
            {/* Animated particles effect */}
            <div className="absolute inset-0 overflow-hidden opacity-40">
              <div className="stars-container"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky heading with animated badge */}
      <div 
        ref={headingRef}
        className="relative z-10 w-full py-8 px-6 backdrop-blur-sm"
      >
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-500 bg-opacity-20 rounded-full backdrop-blur-md">
            <span className="text-blue-300 font-medium text-sm">Discover Paradise</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Popular Destinations
          </h2>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-blue-400 opacity-50"></div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
              <p className="text-xl text-blue-100 font-medium">
                <span className="font-semibold">{locations[activeIndex].name}</span>
                <span className="mx-2 opacity-50">•</span>
                <span className="text-blue-300">{locations[activeIndex].highlight}</span>
              </p>
            </div>
            <div className="h-px w-12 bg-blue-400 opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Locations container */}
      <div 
        ref={containerRef}
        className="relative z-20 pt-[50vh]"
      >
        {locations.map((location, index) => (
          <div
            key={`location-${location.id}`}
            ref={addLocationRef}
            className="min-h-screen flex items-center justify-center px-6 py-32"
          >
            <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transform transition-all duration-700">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Left side: Location info */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-4 py-1 bg-blue-500 bg-opacity-30 text-blue-200 text-sm font-medium rounded-full">
                      {location.highlight}
                    </span>
                    <span className="text-blue-300 text-sm">Location {index + 1}/{locations.length}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{location.name}</h3>
                  
                  <p className="text-lg text-blue-100 mb-6 leading-relaxed">{location.description}</p>
                  
                  {/* Features list */}
                  <div className="space-y-3">
                    <h4 className="text-sm uppercase tracking-widest text-blue-300 font-medium">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {location.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-blue-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Explore Location
                    </button>
                    <button className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center backdrop-blur-sm">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="text-white text-center px-4 py-2 bg-black/30 backdrop-blur-md rounded-full">
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-sm font-medium">Scroll to explore</span>
        </div>
      </div>

      {/* Add custom CSS for the stars/particles effect */}
      <style jsx>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          overflow: hidden;
        }
        
        .stars-container:before, 
        .stars-container:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 2px),
            radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 100px 100px, 50px 50px;
          background-position: 0 0, 25px 25px;
          animation: parallaxStars 100s linear infinite;
        }
        
        .stars-container:after {
          background-size: 50px 50px, 25px 25px;
          background-position: 0 0, 12.5px 12.5px;
          animation-duration: 60s;
        }
        
        @keyframes parallaxStars {
          from { transform: translateY(0); }
          to { transform: translateY(1000px); }
        }
      `}</style>
    </section>
  );
};

export default PopularLocationsSection;