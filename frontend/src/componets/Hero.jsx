import React, { useEffect, useState, useRef } from 'react';
import map from '../assets/Images/map.png';

const WorldTrekHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const boatRef1 = useRef(null);
  const boatRef2 = useRef(null);
  const boatRef3 = useRef(null);
  const boatRef4 = useRef(null);
  const dolphinRef1 = useRef(null);
  const dolphinRef2 = useRef(null);
  const mapRef = useRef(null);
  const waveLayerRef1 = useRef(null);
  const waveLayerRef2 = useRef(null);
  const waveLayerRef3 = useRef(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Animated elements with increased speed
    const animateElements = () => {
      // Animate boats with faster wave movement
      if (boatRef1.current && boatRef2.current && boatRef3.current && boatRef4.current) {
        const time = Date.now() / 500; // Speed up by using 500 instead of 1000
        boatRef1.current.style.transform = `translateX(${Math.sin(time) * 10}px) translateY(${Math.sin(time * 0.8) * 6}px)`;
        boatRef2.current.style.transform = `translateX(${Math.sin(time * 0.7) * 12}px) translateY(${Math.sin(time * 0.9) * 8}px)`;
        boatRef3.current.style.transform = `translateX(${Math.sin(time * 0.6) * 9}px) translateY(${Math.sin(time * 0.75) * 7}px)`;
        boatRef4.current.style.transform = `translateX(${Math.sin(time * 0.5) * 11}px) translateY(${Math.sin(time * 0.85) * 6}px)`;
      }
      
      // Animate dolphins with faster jumping motion
      if (dolphinRef1.current && dolphinRef2.current) {
        const time = Date.now() / 600; // Speed up dolphin animations
        // First dolphin jumps every 2 seconds instead of 4
        const jumpPhase1 = (time % 2) / 2;
        const jumpY1 = jumpPhase1 > 0.5 ? 0 : Math.sin(jumpPhase1 * Math.PI) * 30;
        dolphinRef1.current.style.transform = `translateY(-${jumpY1}px) rotate(${jumpY1 > 5 ? 15 : 0}deg)`;
        
        // Second dolphin jumps with offset
        const jumpPhase2 = ((time + 1) % 2) / 2;
        const jumpY2 = jumpPhase2 > 0.5 ? 0 : Math.sin(jumpPhase2 * Math.PI) * 30;
        dolphinRef2.current.style.transform = `translateY(-${jumpY2}px) rotate(${jumpY2 > 5 ? 15 : 0}deg)`;
      }
      
      // Animate wave layers with faster movement
      if (waveLayerRef1.current && waveLayerRef2.current && waveLayerRef3.current) {
        const time = Date.now() / 400; // Faster wave animations
        // Each layer moves at different speeds
        waveLayerRef1.current.style.backgroundPositionX = `${(time * 25) % 100}px`;
        waveLayerRef2.current.style.backgroundPositionX = `${(time * -30) % 100}px`;
        waveLayerRef3.current.style.backgroundPositionX = `${(time * 40) % 100}px`;
      }
      
      requestAnimationFrame(animateElements);
    };

    window.addEventListener('scroll', handleScroll);
    const animationFrame = requestAnimationFrame(animateElements);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Dynamic ocean background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      
      {/* Wave animation layers with improved visibility */}
      <div 
        ref={waveLayerRef1}
        className="absolute inset-0 opacity-30" // Increased opacity from 20 to 30
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' stroke='white' fill='none' stroke-width='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px'
        }}
      />
      
      <div 
        ref={waveLayerRef2}
        className="absolute inset-0 opacity-25" // Increased from 15 to 25
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15 Q 30 5, 60 15 T 120 15' stroke='white' fill='none' stroke-width='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 30px'
        }}
      />
      
      <div 
        ref={waveLayerRef3}
        className="absolute inset-0 opacity-20" // Increased from 10 to 20
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 7.5 Q 20 2.5, 40 7.5 T 80 7.5' stroke='white' fill='none' stroke-width='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 15px'
        }}
      />

      {/* Main content container */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Map container with increased size */}
          <div className="w-full md:w-3/5 flex justify-center relative">
            <div className="relative w-full max-w-xl">
              {/* Map */}
              <div 
                ref={mapRef}
                className="relative mx-auto"
                style={{ 
                  transform: `translateY(${scrollY * -0.1}px)`
                }}
              >
                <img 
                  src={map} 
                  alt="Andaman Islands Map" 
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                
                {/* Location markers */}
                
                
                {/* Boats with realistic movement */}
                <div 
                  ref={boatRef1}
                  className="absolute bottom-1/3 left-5 transition-transform"
                >
                  <svg width="40" height="20" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10 L20 10 L35 10 L30 18 L10 18 L5 10 Z" fill="#6b4226" />
                    <path d="M20 2 L20 10 L15 10 Z" fill="white" />
                    <path d="M20 2 L20 10 L25 10 Z" fill="#eee" />
                  </svg>
                </div>
                
                <div 
                  ref={boatRef2}
                  className="absolute bottom-1/4 right-8 transition-transform"
                >
                  <svg width="30" height="15" viewBox="0 0 30 15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8 L15 8 L27 8 L24 14 L6 14 L3 8 Z" fill="#8B4513" />
                    <path d="M15 1 L15 8 L10 8 Z" fill="white" />
                    <path d="M15 1 L15 8 L20 8 Z" fill="#eee" />
                  </svg>
                </div>
                
                {/* Additional boats */}
                <div 
                  ref={boatRef3}
                  className="absolute top-1/3 right-1/4 transition-transform"
                >
                  <svg width="35" height="18" viewBox="0 0 35 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 9 L17 9 L31 9 L27 16 L8 16 L4 9 Z" fill="#5D4037" />
                    <path d="M17 2 L17 9 L12 9 Z" fill="white" />
                    <path d="M17 2 L17 9 L22 9 Z" fill="#f5f5f5" />
                  </svg>
                </div>
                
                <div 
                  ref={boatRef4}
                  className="absolute top-2/3 left-1/4 transition-transform"
                >
                  <svg width="30" height="15" viewBox="0 0 30 15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8 L15 8 L27 8 L24 14 L6 14 L3 8 Z" fill="#795548" />
                    <path d="M15 1 L15 8 L10 8 Z" fill="white" />
                    <path d="M15 1 L15 8 L20 8 Z" fill="#f0f0f0" />
                  </svg>
                </div>
                
                {/* Jumping dolphins */}
                <div 
                  ref={dolphinRef1}
                  className="absolute bottom-1/5 left-1/3 transition-all duration-200" // Faster transition
                >
                  <svg width="36" height="24" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12 Q 8 4, 18 8 T 34 12 Q 30 16, 22 16 T 10 18 T 2 12" fill="#607D8B" />
                    <circle cx="6" cy="10" r="1" fill="black" />
                    <path d="M28 10 L 30 8 L 32 10" stroke="#607D8B" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                
                <div 
                  ref={dolphinRef2}
                  className="absolute bottom-1/4 right-1/3 transition-all duration-200" // Faster transition
                >
                  <svg width="30" height="20" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10 Q 7 4, 15 7 T 28 10 Q 25 14, 18 14 T 8 15 T 2 10" fill="#78909C" />
                    <circle cx="5" cy="8" r="1" fill="black" />
                    <path d="M22 8 L 24 6 L 26 8" stroke="#78909C" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text content with cleaner styling */}
          <div className="w-full md:w-2/5 text-white">
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                WORLD TREK
              </h1>
              
              <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
              
              <p className="text-lg md:text-xl mb-8 font-light leading-relaxed">
                Experience the pristine paradise of Andaman Islands with our exclusive guided tours and luxury accommodations.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Explore Packages
                </button>
                
                <button className="px-6 py-3 bg-transparent text-white border border-white/50 font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldTrekHero;