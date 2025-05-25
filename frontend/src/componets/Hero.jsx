import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import birdImage from "../assets/Images/bird.png"; // Replace with your bird image path
import islandImage from "../assets/Images/island.png"; // Replace with your island image path  
import lighthouseImage from "../assets/Images/lighthouse.png"; // Replace with your lighthouse image path

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CoastalLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for animation targets
  const containerRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const birdsRef = useRef(null);
  const skyRef = useRef(null);
  const starsRef = useRef(null);
  const oceanRef = useRef(null);
  const upperOceanRef = useRef(null);
  const lighthouseRef = useRef(null);
  const islandRef = useRef(null);
  const wavesRef = useRef(null);
  const cloudsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    // Continuous wave animation
    gsap.to(".wave", {
      x: -100,
      duration: 3,
      ease: "none",
      repeat: -1,
    });

    // Floating clouds animation
    gsap.to(".cloud", {
      x: window.innerWidth + 200,
      duration: 20,
      ease: "none",
      repeat: -1,
      stagger: 3,
    });

    // Island gentle floating animation
    gsap.to(islandRef.current, {
      y: "+=10",
      duration: 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Lighthouse rotation animation for light beam
    gsap.to(".lighthouse-beam", {
      rotation: 360,
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    // Bubbles floating animation
    gsap.to(".bubble", {
      y: "-=100",
      opacity: 0,
      duration: 4,
      ease: "power1.out",
      repeat: -1,
      stagger: 0.5,
    });
    
    // Create a timeline for the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
        pin: true, // Pin the section during scroll
      }
    });

    // Day to Night Sky Transition with more dramatic colors
    tl.to(skyRef.current, {
      background: "linear-gradient(to bottom, #0f0f23, #1a1a3e, #2d1b69, #1e40af)",
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Sun setting animation with color change
    tl.to(sunRef.current, {
      y: 250,
      x: -50,
      opacity: 0.2,
      scale: 1.2,
      background: "linear-gradient(135deg, #ff6b35, #f7931e)",
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Moon rising animation with glow
    tl.fromTo(moonRef.current, {
      y: 200,
      opacity: 0,
      scale: 0.3,
      rotation: -180
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 0.4);

    // Stars appearing with twinkle effect
    tl.to(starsRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, 0.6);

    // Birds flying animation - more dynamic
    tl.to(birdsRef.current, {
      x: window.innerWidth * 1.2,
      y: -150,
      rotation: 25,
      scale: 0.8,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0);

    // Ocean color change to darker night blue with waves
    tl.to([oceanRef.current, upperOceanRef.current], {
      background: "linear-gradient(to bottom, #1e3a8a, #1e40af)",
      duration: 1,
      ease: "power2.inOut"
    }, 0.3);

    // Wave intensity increase
    tl.to(".wave", {
      scaleY: 1.5,
      duration: 1,
      ease: "power2.inOut"
    }, 0.3);

    // Lighthouse light effect with rotating beam
    tl.to(lighthouseRef.current, {
      filter: "drop-shadow(0 0 30px #fbbf24) brightness(1.5) contrast(1.2)",
      duration: 0.8,
      ease: "power2.inOut"
    }, 0.7);

    // Island slight movement
    tl.to(islandRef.current, {
      y: "+=5",
      duration: 1,
      ease: "power2.inOut"
    }, 0.5);

    // Clouds fade during night
    tl.to(".cloud", {
      opacity: 0.3,
      duration: 1,
      ease: "power2.inOut"
    }, 0.4);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Generate random stars with enhanced twinkling
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 70}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${1 + Math.random() * 3}s`,
        opacity: Math.random() * 0.8 + 0.2,
      };
      stars.push(
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={style}
        />
      );
    }
    return stars;
  };

  // Generate floating clouds
  const generateClouds = () => {
    const clouds = [];
    for (let i = 0; i < 4; i++) {
      const style = {
        left: `${-20 + i * 30}%`,
        top: `${10 + Math.random() * 30}%`,
        animationDelay: `${i * 5}s`,
      };
      clouds.push(
        <div
          key={i}
          className="cloud absolute opacity-60"
          style={style}
        >
          <div className="w-16 h-8 bg-white rounded-full relative">
            <div className="absolute -left-4 top-0 w-12 h-6 bg-white rounded-full" />
            <div className="absolute -right-4 top-1 w-10 h-5 bg-white rounded-full" />
            <div className="absolute left-2 -top-2 w-8 h-4 bg-white rounded-full" />
          </div>
        </div>
      );
    }
    return clouds;
  };

  return (
    <div className="h-[200vh]"> {/* Make container scrollable */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Sky Background */}
        <div 
          ref={skyRef}
          className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-300 transition-all duration-1000"
        />

        {/* Floating Clouds */}
        <div className="absolute inset-0 z-5">
          {generateClouds()}
        </div>

        {/* Stars (initially hidden) */}
        <div ref={starsRef} className="absolute inset-0 opacity-0 z-8">
          {generateStars()}
        </div>

        {/* Sun with rays */}
        <div 
          ref={sunRef}
          className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000"
        >
          <div className="relative w-40 h-40">
            {/* Sun rays */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-20 bg-yellow-200 opacity-60"
                  style={{
                    left: '50%',
                    top: '-10px',
                    transformOrigin: '50% 90px',
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
            {/* Sun body */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-lg" />
          </div>
        </div>

        {/* Moon with craters and glow */}
        <div 
          ref={moonRef}
          className="absolute top-16 right-1/4 w-32 h-32 z-10 opacity-0"
        >
          <div className="relative">
            {/* Moon glow */}
            <div className="absolute -inset-4 rounded-full bg-blue-100 opacity-20 blur-xl" />
            {/* Moon body */}
            <div 
              className="w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #f9fafb, #e5e7eb, #d1d5db)",
                boxShadow: "inset -8px -8px 15px rgba(0,0,0,0.1), 0 0 20px rgba(219, 234, 254, 0.5)"
              }}
            >
              {/* Moon craters */}
              <div className="absolute top-4 left-6 w-3 h-3 bg-gray-300 rounded-full opacity-40" />
              <div className="absolute top-8 right-8 w-2 h-2 bg-gray-300 rounded-full opacity-30" />
              <div className="absolute bottom-6 left-8 w-4 h-4 bg-gray-300 rounded-full opacity-35" />
            </div>
          </div>
        </div>

        {/* Birds - Using your bird image */}
        <div ref={birdsRef} className="absolute top-16 left-24 z-10">
          <img src={birdImage} alt="Flying birds" className="w-auto h-16" />
        </div>

        {/* Main Island - Using your island image - Centered */}
        <div ref={islandRef} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <img src={islandImage} alt="Tropical island" className="w-full h-auto max-w-2xl drop-shadow-lg" />
        </div>

        {/* Lighthouse Island - Using your lighthouse image - Right side */}
        <div ref={lighthouseRef} className="absolute bottom-20 right-16 z-20 transition-all duration-500">
          <div className="relative">
            <img src={lighthouseImage} alt="Island with lighthouse" className="w-80 h-auto drop-shadow-lg" />
            {/* Lighthouse beam effect */}
            <div className="lighthouse-beam absolute top-0 left-1/2 transform -translate-x-1/2 origin-bottom opacity-30">
              <div 
                className="w-2 h-40 bg-gradient-to-t from-yellow-200 to-transparent"
                style={{
                  clipPath: 'polygon(40% 100%, 60% 100%, 80% 0%, 20% 0%)',
                  filter: 'blur(2px)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Animated Waves */}
        <div ref={wavesRef} className="absolute bottom-0 w-full z-16 overflow-hidden">
          {/* Multiple wave layers for depth */}
          <div className="wave absolute bottom-0 left-0 w-full h-16 opacity-60">
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
                fill="rgba(59, 130, 246, 0.8)"
              />
            </svg>
          </div>
          <div className="wave absolute bottom-0 left-0 w-full h-20 opacity-40" style={{ animationDelay: '-1s' }}>
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 L1200,120 L0,120 Z"
                fill="rgba(96, 165, 250, 0.6)"
              />
            </svg>
          </div>
          <div className="wave absolute bottom-0 left-0 w-full h-12 opacity-80" style={{ animationDelay: '-2s' }}>
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C120,80 280,0 600,40 C920,80 1080,0 1200,40 L1200,120 L0,120 Z"
                fill="rgba(147, 197, 253, 0.8)"
              />
            </svg>
          </div>
        </div>

        {/* Upper Ocean layer */}
        <div 
          ref={upperOceanRef}
          className="absolute bottom-0 w-full z-15 h-24 bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-1000"
        />
        
        {/* Main Ocean/Sea */}
        <div className="absolute bottom-0 w-full z-10">
          <div 
            ref={oceanRef}
            className="w-full h-40 bg-gradient-to-t from-blue-600 to-blue-500 relative transition-all duration-1000"
          >
            {/* Enhanced Bubbles with different sizes and animations */}
            <div className="bubble absolute -top-2 left-1/4 w-8 h-8 bg-blue-300 rounded-full opacity-40" />
            <div className="bubble absolute top-4 left-1/2 w-12 h-12 bg-blue-200 rounded-full opacity-30" style={{ animationDelay: '1s' }} />
            <div className="bubble absolute top-2 left-3/4 w-6 h-6 bg-blue-300 rounded-full opacity-50" style={{ animationDelay: '2s' }} />
            <div className="bubble absolute top-10 left-1/3 w-10 h-10 bg-blue-300 rounded-full opacity-35" style={{ animationDelay: '0.5s' }} />
            <div className="bubble absolute top-12 left-2/3 w-14 h-14 bg-blue-200 rounded-full opacity-25" style={{ animationDelay: '1.5s' }} />
            <div className="bubble absolute top-6 left-1/6 w-4 h-4 bg-blue-400 rounded-full opacity-60" style={{ animationDelay: '3s' }} />
            <div className="bubble absolute top-16 left-5/6 w-9 h-9 bg-blue-300 rounded-full opacity-40" style={{ animationDelay: '2.5s' }} />
            
            {/* Underwater light rays */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-200 to-transparent opacity-20 animate-pulse" />
              <div className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-blue-100 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-blue-200 to-transparent opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content section to enable scrolling */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Coastal Paradise</h2>
          <p className="text-xl">Scroll up to see the magic happen again!</p>
        </div>
      </div>
    </div>
  );
}