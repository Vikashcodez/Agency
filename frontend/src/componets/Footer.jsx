import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              <span className="text-blue-400">World</span> Trek
            </h3>
            <p className="text-gray-400">
              Crafting unforgettable journeys across the globe since 2010. Your adventure starts with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Tour Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Special Offers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider">Popular Destinations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Bali, Indonesia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Santorini, Greece</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Kyoto, Japan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Paris, France</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Machu Picchu, Peru</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Safari, Tanzania</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400">123 Adventure Lane, Travel City, TC 10101</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400" />
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400" />
                <p className="text-gray-400">info@worldtrek.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-blue-400" />
                <p className="text-gray-400">Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 border-t border-gray-800 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h4>
              <p className="text-gray-400">Get travel deals and updates directly to your inbox</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 w-full md:w-64"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} World Trek. All rights reserved. | <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a> | <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></p>
          <p className="mt-2 text-sm">Proudly crafted by the World Trek team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;