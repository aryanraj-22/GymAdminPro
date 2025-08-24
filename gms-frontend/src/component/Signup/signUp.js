import React, { useState } from 'react';
import './signUp.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from 'react-toastify';

import { URL } from '../../url/url';

const SignUp = () => {

  const [inputField, setInputField] = useState({
    gymName: '',
    email: '',
    userName: '',
    password: '',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png?20240121032759',
  });
  const [progressBar, setProgressBar] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    profilePic: ''
  });

  const handleInputField = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
    setErrors({ ...errors, [key]: '' });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gym-management');

    try {
      setProgressBar(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfmvgms2t/image/upload',
        data
      );
      setProgressBar(false);
      const imageUrl = response.data.url;
      setInputField({
        ...inputField,
        profilePic: imageUrl,
      });
      setErrors({ ...errors, profilePic: '' });
    } catch (err) {
      setProgressBar(false);
      console.log(err);
      toast.error('Image upload failed');
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', password: '', profilePic: '' };

    if (!inputField.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (inputField.password.length < 8) {
      newErrors.password = 'Password must be atleast 8 characters long';
      valid = false;
    }

    if (
      !inputField.profilePic ||
      inputField.profilePic.includes('Twitter_default_profile')
    ) {
      newErrors.profilePic = 'Profile picture is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return; 

    setProgressBar(true);
    await axios
      .post(`${URL}/auth/register`, inputField)
      .then((resp) => {
        let message = resp.data.message;
        toast.success(message);
        setProgressBar(false);
      })
      .catch((err) => {
        setProgressBar(false);
        console.log(err);
        toast.error('Server error');
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white bg-opacity-60 rounded-lg shadow-lg p-6 relative">
      {progressBar && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Your Gym</h2>

      <div className="space-y-6">
        {}
        <div>
          <input
            type="email"
            value={inputField.email}
            onChange={(e) => handleInputField(e, 'email')}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {}
        <input
          type="text"
          value={inputField.gymName}
          onChange={(e) => handleInputField(e, 'gymName')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          placeholder="Enter Gym Name"
        />

        {}
        <input
          type="text"
          value={inputField.userName}
          onChange={(e) => handleInputField(e, 'userName')}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          placeholder="Enter Username"
        />

        {}
        <div>
          <input
            type="password"
            value={inputField.password}
            onChange={(e) => handleInputField(e, 'password')}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Upload Profile Picture</label>
          <input
            type="file"
            onChange={uploadImage}
            className="w-full p-2 bg-white border border-gray-300 rounded-lg text-black"
          />
          {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
        </div>

        {}
        <div className="flex justify-center">
          <img
            className="h-[150px] w-[200px] rounded-2xl object-cover border-2 border-gray-300"
            src={inputField.profilePic}
            alt="Profile Preview"
          />
        </div>

        {}
        <div
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-center cursor-pointer transition"
          onClick={handleRegister}
        >
          Register
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
