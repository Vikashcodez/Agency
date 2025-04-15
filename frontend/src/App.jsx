import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './componets/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Admin/Login'
import Register from './Admin/Register'
import AdminDashboard from './Admin/Dashboard'
import AddPackage from './Admin/AddPackage'
import Packages from './Pages/Packages'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Packages />} />
        <Route path="/about" element= {< About />} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/signin" element={ <Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/booking" element={<div>Booking Page</div>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-package" element={<AddPackage />} />

      </Routes>
    </Router>
  )
}

export default App
