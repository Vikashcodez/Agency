import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sliderImg from "../assets/images/saling.png";
import sliderBg from "../assets/images/bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hide navbar when component mounts
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) navbar.style.display = 'none';

    return () => {
      if (navbar) navbar.style.display = 'block';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      alert(res.data.message);
      res.data.role === "admin" ? navigate("/admin-dashboard") : navigate("/user-dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google sign in would be implemented here");
  };

  const handleFacebookSignIn = () => {
    alert("Facebook sign in would be implemented here");
  };

  return (
    <section
      className="relative overflow-hidden pt-12 bg-cover bg-no-repeat min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${sliderBg})`, backgroundPosition: "bottom" }}
    >
      {/* Moving boat animation */}
      <div className="absolute bottom-64 left-0 right-0 flex justify-center overflow-hidden pointer-events-none">
        <img 
          src={sliderImg} 
          alt="Ship" 
          className="w-[300px] md:w-[450px] animate-slider opacity-100" 
        />
      </div>
      
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 z-10 flex justify-center items-center">
        {/* Enhanced Login card */}
        <div 
          className="relative bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4"
          style={{
            backdropFilter: 'blur(10px)',
            boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          {/* Mirror effect overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)'
            }}
          ></div>
          
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Welcome Back</h2>
            <p className="text-blue-800 text-center mb-8">Sign in to your account</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
            
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="space-y-3">
              <button
                className="flex items-center justify-center w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a73199f1bb1d3ea89b40297fa0cb3c5a5d23d64a09d3c0065afa4619abb32ce?apiKey=597363a3080546f9b072bf59bebbfd17&"
                  className="w-5 h-5 mr-3"
                  alt="Google"
                />
                Continue with Google
              </button>
              
              <button
                className="flex items-center justify-center w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={handleFacebookSignIn}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3feb9724a7eb37edc68e698d2bf9cfdafff2e78a2d0733da73a89c1beed3d397?apiKey=597363a3080546f9b072bf59bebbfd17&"
                  className="w-5 h-5 mr-3"
                  alt="Facebook"
                />
                Continue with Facebook
              </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate("/create-account")}
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes slider-move {
            0% { transform: translateX(-100%) translateY(5%) scaleX(1); }
            49% { transform: translateX(100%) translateY(-5%) scaleX(1); }
            50% { transform: translateX(101%) translateY(-5%) scaleX(-1); }
            99% { transform: translateX(-101%) translateY(5%) scaleX(-1); }
            100% { transform: translateX(-100%) translateY(5%) scaleX(1); }
          }
          .animate-slider {
            animation: slider-move 8s infinite ease-in-out;
          }
        `}
      </style>
    </section>
  );
};

export default Login;