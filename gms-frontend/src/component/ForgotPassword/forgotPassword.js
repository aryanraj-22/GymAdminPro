import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../Loader/loader';
import { URL } from '../../url/url';
const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false)
    const [correctOTP, setCorrectOTP] = useState(false)
    const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" })
    const [progressBar, setProgressBar] = useState(false)
    const handleOnClickBtn = () => {
        if (!emailSent) {

            otpSend()

        } else if (!correctOTP) {
            verifyOtp()
        }else{
            resetPasswords()
        }
    }

    const resetPasswords =async()=>{
        setProgressBar(true);
        await axios.post(`${URL}/auth/reset-password`, { "email": inputField.email,newPassword:inputField.newPassword }).then((response) => {
            
            toast.success(response.data.message);
            setProgressBar(false)

        }).catch(err => {
            toast.error("Some technical issue in sending Mail")
            setProgressBar(false)


        })
    }

    const otpSend = async () => {
        setProgressBar(true)
        await axios.post(`${URL}/auth/reset-password/sendOtp`, { "email": inputField.email }).then((response) => {
            
            toast.success(response.data.message);
            setProgressBar(false)
            setEmailSent(true);

        }).catch(err => {
            toast.error("Some technical issue in sending Mail")
            setProgressBar(false)


        })
    }

    const verifyOtp = async()=>{
        setProgressBar(true)
        await axios.post(`${URL}/auth/reset-password/checkOtp`,{otp:inputField.otp,email:inputField.email}).then((response)=>{
            toast.success(response.data.message);
            setProgressBar(false)
            setCorrectOTP(true)
        }).catch(err => {
            toast.error("Some technical issue in Checking OTP")
            setProgressBar(false)
        })
    }



    const handleInputChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value });
    }
   return (
  <div className="w-full max-w-xl mx-auto mt-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-gray-800 text-lg">
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Enter your Email</label>
      <input
        value={inputField.email}
        onChange={(e) => handleInputChange(e, "email")}
        type="email"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter Email"
      />
    </div>

    {emailSent && (
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Enter OTP</label>
        <input
          value={inputField.otp}
          onChange={(e) => handleInputChange(e, "otp")}
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter OTP"
        />
      </div>
    )}

    {emailSent && correctOTP && (
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Enter New Password</label>
        <input
          value={inputField.newPassword}
          onChange={(e) => handleInputChange(e, "newPassword")}
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter New Password"
        />
      </div>
    )}

    {progressBar && <Loader />}

    <div
      onClick={handleOnClickBtn}
      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center cursor-pointer transition"
    >
      {emailSent && !correctOTP
        ? "Enter OTP"
        : correctOTP
        ? "Update Password"
        : "Send OTP"}
    </div>

    <ToastContainer />
  </div>
)

}

export default ForgotPassword