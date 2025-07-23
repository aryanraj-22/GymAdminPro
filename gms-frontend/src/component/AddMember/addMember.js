import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { toast,ToastContainer } from 'react-toastify';
import { URL } from '../../url/url';
const AddMember = () => {
  const [progressBar, setProgressBar] = useState(false);
  const [imageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain")
  const [selectedOption,setSelectedoption]= useState("");
  
  const [inputField, setInputField] = useState({ name: "", mobileNo: "", address: "", membership: "", profilePic: "", joiningDate: "" })
  const [membershipData,setmembershipData] = useState([]);


  const handleInputChange = (event,key)=>{
    setInputField({...inputField,[key]:event.target.value})
  }


  const uploadImage = async (e) => {
    console.log("Uploading")
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    // youtube-clone
    data.append('upload_preset', 'gym-management');
    try {
      // cloudName="dhlklhfgj"
      setProgressBar(true)
      const response = await axios.post("https://api.cloudinary.com/v1_1/dfmvgms2t/image/upload", data)
      setProgressBar(false)
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setInputField({
        ...inputField, "profilePic": imageUrl
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    
    fetchMembership()
  },[])

  const fetchMembership = async()=>{
    await axios.get(`${URL}/plans/get-membership`,{ withCredentials: true}).then((resp)=>{
      if(resp.data.membership.length===0){
        return toast.error("Please Add Membership First",{
          className:'text-xl'
        });
      }
      let a = resp.data.membership[0]._id
      setSelectedoption(a);
      setmembershipData(resp.data.membership);
      
    }).catch(err=>{
      toast.error("Something Went Wrong")
    })
  }

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedoption(value);
    
  };

  const register = async()=>{
    let body = inputField;
    body.membership= selectedOption;
    console.log(body)
    setProgressBar(true)
    axios.post(`${URL}/members/register-member`,body,{withCredentials:true}).then((resp)=>{
      setProgressBar(false)
      toast.success("Registered SuccessFully",{
        className:"text-lg"
      })
      setTimeout(()=>{
        window.location.reload();
      },[2000])
    }).catch(err=>{
      setProgressBar(false)
      toast.error("Something Went Wrong",{
        className:"text-lg"
      })
    })
  }

  return (
    <div className='text-black'>
      <div className=' grid grid-cols-1 gap-5 md:grid-cols-2 text-lg'>
        <input onChange={(event)=>{handleInputChange(event,'name')}} value={inputField.name} placeholder='Name of the Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input onChange={(event)=>{handleInputChange(event,'mobileNo')}} value={inputField.mobileNo} placeholder='Mobile No' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 placeholder:text-gray' />
        <input onChange={(event)=>{handleInputChange(event,'address')}} value={inputField.address} placeholder='Address' type='text' className='border-2 w-[90%]  pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 placeholder:text-gray' />
        <input onChange={(event)=>{handleInputChange(event,'joiningDate')}} value={inputField.joiningDate} placeholder='Address' type='date' className='border-2 w-[90%]  pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 placeholder:text-gray' />
        
        <select value={selectedOption} onChange={handleOnChangeSelect} name="options" className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
          {
            membershipData.map((item,index)=>{
              return(<option key={index} value={item._id}>{`${item.months} Month${item.months!==1?'s':''} Membership`}</option>);
            })
          }
          
        </select>

        <input type='file' onChange={(e)=>{uploadImage(e)}} />

        

        <div className='w-1/4'>
          <img src={imageUrl} className='w-full h-full rounded-full' />
        </div>


      </div>
      <div onClick={()=>{register()}} className='p-3 border-2 mt-5 w-28 text-lg h-14 text-center mx-auto bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        Register
      </div>
      {progressBar && <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}

      <ToastContainer/>

    </div>
  )
}

export default AddMember