import { useState } from 'react';
import { FiSend, FiMapPin, FiCalendar, FiUsers, FiDollarSign } from 'react-icons/fi';

const TravelEnquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    travelers: 1,
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Plan Your Dream Vacation
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Get personalized travel package recommendations from our experts
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* 3D Card Effect */}
          <div className="w-full lg:w-1/2 transform transition-all duration-500 hover:rotate-y-6 hover:scale-105 perspective-1000">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 transform-style-preserve-3d">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Popular Packages</h3>
                <p className="text-gray-600 mb-6">
                  Explore our curated collection of unforgettable travel experiences tailored to your preferences.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FiMapPin className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Exotic Destinations</h4>
                      <p className="text-gray-600 text-sm">Bali, Maldives, Santorini, and more</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <FiCalendar className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Flexible Dates</h4>
                      <p className="text-gray-600 text-sm">Choose your perfect travel window</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <FiUsers className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Group & Solo Options</h4>
                      <p className="text-gray-600 text-sm">Travel with friends or go solo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                      <FiDollarSign className="text-yellow-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Budget Friendly</h4>
                      <p className="text-gray-600 text-sm">Options for every price range</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
                <p className="mb-4">Get 15% off on all international packages booked this month</p>
                <button className="bg-white text-cyan-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                  View Packages
                </button>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us Your Enquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                        Destination
                      </label>
                      <select
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="">Select Destination</option>
                        <option value="bali">Bali, Indonesia</option>
                        <option value="maldives">Maldives</option>
                        <option value="santorini">Santorini, Greece</option>
                        <option value="paris">Paris, France</option>
                        <option value="tokyo">Tokyo, Japan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        id="travelDate"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Travelers
                      </label>
                      <input
                        type="number"
                        id="travelers"
                        name="travelers"
                        min="1"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range (per person)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="">Select Budget</option>
                      <option value="500-1000">$500 - $1000</option>
                      <option value="1000-2000">$1000 - $2000</option>
                      <option value="2000-5000">$2000 - $5000</option>
                      <option value="5000+">$5000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Special requests, dietary needs, etc."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiSend className="mr-2" />
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelEnquiry;