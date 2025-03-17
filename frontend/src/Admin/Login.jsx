import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      alert(res.data.message);
      res.data.role === "admin" ? navigate("/admin-dashboard") : navigate("/user-dashboard");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="p-6 bg-white shadow-md rounded-lg" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="p-2 border rounded w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="p-2 border rounded w-full mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white p-2 rounded mt-3 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
