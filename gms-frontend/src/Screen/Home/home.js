import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../component/Login/login';
import SignUp from '../../component/Signup/signUp';

const Home = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full text-white font-sans">
      {}
      <div className="relative bg-gradient-to-r from-green-400 via-blue-400 to-blue-600 min-h-screen">
        {}
        <div className="absolute inset-0 bg-black opacity-20 "></div>

        {}
        <nav className="relative z-10 flex justify-between items-center px-8 py-5 bg-transparent">
          <div className="text-2xl font-bold flex items-center gap-2 m-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3043/3043918.png"
              alt="gym logo"
              className="h-8 w-8"
            />
            GymAdminPro
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowLogin(true);
                setShowSignUp(false);
              }}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded text-white font-semibold flex items-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            <button
              onClick={() => {
                setShowSignUp(true);
                setShowLogin(false);
              }}
              className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded text-white font-semibold flex items-center gap-2"
            >
              <i className="fas fa-user-plus"></i> Register
            </button>
          </div>
        </nav>

        {}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-10 mt-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Manage Your Gym Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Keep track of members, payments, sessions, and more — all in one place.
          </p>

          {!showLogin && !showSignUp && (
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-white text-green-700 font-bold px-7 py-4 rounded-lg hover:bg-gray-200 transition mt-10 text-xl"
            >
              Get Started
            </button>
          )}
        </div>

        {}
        <div className="relative z-10 flex justify-center items-center px-4 pb-20">
          <div className="w-full max-w-xl">
            {showLogin && <Login />}
            {showSignUp && <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
