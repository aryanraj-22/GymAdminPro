import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../url/url';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';

const Login = () => {
  const [forgorPasswordModal, setForgotPasswordModal] = useState(false);
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ userName: '', password: '' });

  const handleFormHandling = (event, key) => {
    setLoginField({ ...loginField, [key]: event.target.value });
  };
   const handleForgotPass = () => {
    setForgotPasswordModal((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${URL}/auth/login`, loginField, {
        withCredentials: true,
      });

      const gym = response.data.gym;

      localStorage.setItem('gymName', gym.gymName);
      localStorage.setItem('gymPic', gym.profilePic);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login Failed');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white bg-opacity-60 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <div className="space-y-6">
        <input
          type="text"
          value={loginField.userName}
          onChange={(e) => handleFormHandling(e, 'userName')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          placeholder="Enter Username"
        />

        <input
          type="password"
          value={loginField.password}
          onChange={(e) => handleFormHandling(e, 'password')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          placeholder="Enter Password"
        />

        <div
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-center cursor-pointer transition"
        >
          Login
        </div>
        
        <div
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-center cursor-pointer transition"
          onClick={handleForgotPass}
        >
          Forgot Password
        </div>
      </div>
       {forgorPasswordModal && (
        <Modal
          title="Forgot password"
          modalCloseFunc={handleForgotPass}
          addMemberModalContent={<ForgotPassword />}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
