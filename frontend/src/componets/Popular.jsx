import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Compass } from 'lucide-react';

const activitiesData = [
  {
    name: "Reef Looker Semi Submarine Ride",
    category: "Explore",
    description: "Dive into an underwater adventure with our semi-submarine experience",
    image2D: "/api/placeholder/400/300",
    image3D: "/api/placeholder/400/300",
    rating: 4.8,
    icons: [
      { icon: <Compass className="w-6 h-6 text-blue-500" />, label: "Adventure" },
      { icon: <Star className="w-6 h-6 text-yellow-500" />, label: "Highly Rated" }
    ]
  },
  {
    name: "Coastal Kayak Expedition",
    category: "Explore",
    description: "Paddle through scenic coastal waters and discover hidden marine landscapes",
    image2D: "/api/placeholder/400/300",
    image3D: "/api/placeholder/400/300",
    rating: 4.6,
    icons: [
      { icon: <Compass className="w-6 h-6 text-green-500" />, label: "Outdoor" },
      { icon: <Star className="w-6 h-6 text-yellow-500" />, label: "Popular" }
    ]
  }
];

const ActivitiesShowcase = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [view, setView] = useState('2D');

  const nextActivity = () => {
    setCurrentActivity((prev) => (prev + 1) % activitiesData.length);
  };

  const prevActivity = () => {
    setCurrentActivity((prev) => (prev - 1 + activitiesData.length) % activitiesData.length);
  };

  const toggleView = () => {
    setView(view === '2D' ? '3D' : '2D');
  };

  const activity = activitiesData[currentActivity];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
      {/* Background Circular Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Activities
          </h1>
          <p className="text-gray-600 mt-2 text-xl">Fun worthy activities which are awaiting for you</p>
        </div>

        {/* Activity Showcase */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <button 
            onClick={prevActivity} 
            className="absolute left-0 z-20 bg-white/60 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white/80 transition"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </button>

          <button 
            onClick={nextActivity} 
            className="absolute right-0 z-20 bg-white/60 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white/80 transition"
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </button>

          {/* Activity Card */}
          <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
            {/* Top Icons */}
            <div className="absolute top-6 right-6 z-30 flex space-x-3">
              {activity.icons.map((iconItem, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 p-2 rounded-full shadow-md flex flex-col items-center"
                >
                  {iconItem.icon}
                  <span className="text-xs text-gray-600 mt-1">{iconItem.label}</span>
                </div>
              ))}
            </div>

            {/* Image Section with 2D/3D Toggle */}
            <div className="relative h-[500px] overflow-hidden">
              <div 
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  transform: view === '2D' ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <img 
                  src={activity.image2D} 
                  alt={`${activity.name} 2D View`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  transform: view === '3D' ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <img 
                  src={activity.image3D} 
                  alt={`${activity.name} 3D View`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* View Toggle Button */}
            <button 
              onClick={toggleView}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-600 transition"
            >
              Switch to {view === '2D' ? '3D' : '2D'} View
            </button>

            {/* Activity Details */}
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">{activity.name}</h2>
              <div className="flex justify-center items-center mt-2">
                <span className="text-purple-600 font-semibold mr-2">{activity.category}</span>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-gray-700">{activity.rating}/5</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-lg">{activity.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesShowcase;