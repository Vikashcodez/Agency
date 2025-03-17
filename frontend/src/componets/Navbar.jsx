import React, { useState, useEffect } from 'react';
import { Plane, MapPin, Info, Phone, Menu, X, LogIn, UserPlus, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative z-50">
      {/* Main Navbar */}
      <nav 
        className={`${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' 
            : 'bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900'
        } transition-all duration-500 ease-in-out`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className={`${
                scrolled ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-white'
              } p-3 rounded-xl shadow-lg transform hover:rotate-12 transition-all duration-300 group`}>
                <Plane 
                  size={28} 
                  className={`${
                    scrolled ? 'text-white' : 'text-blue-600'
                  } transform group-hover:scale-110 transition-transform`} 
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wider">
                  WORLD<span className="text-yellow-400">TREK</span>
                </h1>
                <p className="text-xs text-blue-100 italic font-light">
                  Discover • Experience • Remember
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { name: 'Home', icon: <Plane size={16} />, id: 'home' },
                { 
                  name: 'Packages', 
                  icon: <MapPin size={16} />, 
                  id: 'packages',
                  hasMegaMenu: true 
                },
                { name: 'About', icon: <Info size={16} />, id: 'about' },
                { name: 'Contact Us', icon: <Phone size={16} />, id: 'contact' }
              ].map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.hasMegaMenu) {
                        setMegaMenuOpen(!megaMenuOpen);
                      } else {
                        setMegaMenuOpen(false);
                      }
                    }}
                    className={`relative px-4 py-3 font-medium group flex items-center space-x-1 overflow-hidden rounded-lg mx-1 ${
                      activeTab === item.id 
                        ? 'text-yellow-300'
                        : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {/* 3D hover effect layer */}
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-y-2 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0"></span>
                    
                    {/* Active indicator */}
                    {activeTab === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-t-full shadow-lg"></span>
                    )}
                    
                    {/* Content layer */}
                    <span className="relative flex items-center justify-center space-x-1">
                      {item.icon}
                      <span>{item.name}</span>
                      {item.hasMegaMenu && <ChevronDown size={14} className={megaMenuOpen ? "transform rotate-180 transition-transform" : "transition-transform"} />}
                    </span>
                  </button>
                  
                  {/* Mega Menu for Packages */}
                  {item.hasMegaMenu && megaMenuOpen && item.id === 'packages' && (
                    <div className="absolute top-full left-0 w-screen max-w-4xl bg-gray-900 rounded-lg shadow-xl p-6 grid grid-cols-3 gap-4 text-gray-200 transform transition-all duration-300 border-t-4 border-yellow-400">
                      <div>
                        <h3 className="font-bold text-blue-300 mb-3 border-b border-gray-700 pb-2">Popular Destinations</h3>
                        <ul className="space-y-2">
                          {['Bali', 'Paris', 'Tokyo', 'New York', 'Santorini'].map(destination => (
                            <li key={destination} className="hover:text-blue-300 cursor-pointer transition-colors flex items-center">
                              <MapPin size={14} className="mr-2 text-purple-400" />
                              {destination}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-300 mb-3 border-b border-gray-700 pb-2">Holiday Types</h3>
                        <ul className="space-y-2">
                          {['Beach Getaway', 'Mountain Escape', 'Cultural Tours', 'City Breaks', 'Cruises'].map(type => (
                            <li key={type} className="hover:text-blue-300 cursor-pointer transition-colors">
                              {type}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-gray-800 to-blue-900 p-4 rounded-lg">
                        <h3 className="font-bold text-purple-300 mb-3">Special Offers</h3>
                        <div className="bg-gray-800 p-3 rounded-lg shadow-md transform hover:scale-105 transition-transform">
                          <p className="font-bold text-blue-300">Summer Sale!</p>
                          <p className="text-sm text-gray-300">Get 30% off on select packages</p>
                          <button className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-1 px-3 rounded-full hover:shadow-lg transition-all">
                            Explore Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors">
                <LogIn size={18} />
                <span className="text-sm">Sign In</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                <UserPlus size={18} />
                <span className="text-sm">Sign Up</span>
              </button>
              
              <button className="flex items-center space-x-1 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:shadow-lg hover:bg-yellow-400 transition-all ml-2">
                <span>Book Now</span>
              </button>
            </div>
            
            {/* Mobile Navigation Button */}
            <div className="md:block lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg focus:outline-none text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800 shadow-xl rounded-b-xl overflow-hidden">
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col space-y-3">
              {['Home', 'Packages', 'About', 'Contact Us'].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="p-3 text-gray-200 font-medium flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-lg border-l-4 border-transparent hover:border-blue-500 transition-all"
                >
                  <span>{item}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </a>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-700 grid grid-cols-2 gap-3">
                <button className="py-3 px-4 bg-gray-800 text-gray-200 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
                <button className="py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </button>
              </div>
              
              <button className="w-full py-3 px-4 bg-yellow-500 text-gray-900 rounded-lg font-medium mt-2 hover:shadow-lg transition-all">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;