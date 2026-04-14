import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state from Redux
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is already logged in, redirect based on role
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }

    if (isError) {
      alert(message);
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 md:p-10 font-sans">
      
      {/* Main Card Container */}
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row h-full min-h-[650px]">
        
        {/* LEFT SIDE: HERO IMAGE SECTION */}
        <div className="relative md:w-[60%] w-full min-h-[300px] md:h-auto overflow-hidden">
          {/* Macro Watch Image */}
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=1974&auto=format&fit=crop" 
            alt="Watch mechanism" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Darker overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Hero Text */}
          <div className="relative z-10 h-full flex items-center px-12 md:px-20">
            <h1 className="text-white text-5xl md:text-7xl font-serif font-bold leading-[1.1] max-w-lg drop-shadow-lg">
              Welcome Back to the Art of Bidding
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE: SIGN-IN FORM SECTION */}
        <div className="md:w-[40%] w-full bg-white p-10 md:p-16 flex flex-col">
          
          {/* Logo Heading */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-20">
            BidMaster
          </h2>

          {/* Form */}
          <form className="flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
            
            {/* Username/Email Input */}
            <div className="mb-10">
              <label className="block text-sm text-gray-800 font-medium mb-1">
                Email
              </label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@email.com"
                className="w-full border-b border-gray-900 py-2 outline-none focus:border-b-2 transition-all"
                autoFocus
              />
            </div>

            {/* Password Input */}
            <div className="mb-12">
              <label className="block text-sm text-gray-800 font-medium mb-1">
                Password
              </label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="..........."
                className="w-full border-b border-gray-900 py-2 outline-none focus:border-b-2 transition-all"
              />
            </div>

            {/* Sign In Button */}
            <button  disabled={isLoading} type="submit" className="w-full bg-[#C10000] hover:bg-[#a00000] text-white py-3.5 rounded-md font-medium text-sm transition-all duration-200 shadow-md">
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </button>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-600 font-medium tracking-tight">
                New to BidMaster? <a href="/signup" className="text-black font-bold underline decoration-1 underline-offset-2">Register</a>
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;