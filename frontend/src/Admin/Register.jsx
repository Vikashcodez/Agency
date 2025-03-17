import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", password: "", confirmPassword: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("User registered successfully!");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="p-6 bg-white shadow-md rounded-lg w-96" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <input className="p-2 border rounded w-full" placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
        <button className="bg-green-500 text-white p-2 rounded mt-3 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
