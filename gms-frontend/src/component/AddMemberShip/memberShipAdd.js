import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import { URL } from '../../url/url';
const MemberShipAdd = () => {
  const [data,setData] = useState([]);
  const [inputField,setInputField] = useState({months:"",price:""})
 
  useEffect(()=>{
    fetchMembership()
  },[])

  const handleInputField=(event,key)=>{
    setInputField({...inputField,[key]:parseInt(event.target.value)});
  }

  const handleAddMembership = async()=>{
    await axios.post(`${URL}/plans/add-membership`,inputField,{withCredentials:true}).then((response)=>{
      
      toast.success(response.data.message,{
        className:"text-lg"
      })
      window.location.reload();
    }).catch(err=>{
      toast.error("Something Wrong Happened")
    })
  }


  const fetchMembership =async()=>{
    await axios.get(`${URL}/plans/get-membership`,{ withCredentials: true}).then((resp)=>{

      setData(resp.data.membership);
      if(resp.data.membership.length===0){
        return toast.error("No any Membership added yet",{
          className:"text-lg"
        })
      }
      toast.success(resp.data.message,{
        className:"text-lg"
      })
    }).catch(err=>{
      toast.error("Something Went Wrong")
    })
  }
  return (
    <div className='text-black'>
        <div className='flex flex-wrap gap-5 items-center justify-center'>

          {
            data.map((item,index)=>{
              return(
                <div key={index} className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1  rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                  <div className='font-mono'>{item.months} Month Membership</div>
                  <div className='cursor-pointer'>Rs {item.price}</div>
                </div>
              );
            })
          }

          
        </div>

        <hr className='mt-10 mb-10' />
        <div className='md:flex gap-10'>
          <input value={inputField.months} onChange={(event)=>{handleInputField(event,"months")}} className='border-2 rounded-lg text-lg w-full md:w-1/3 h-1/2 p-2' type='number' placeholder="Add No. of Months" />
          <input value={inputField.price} onChange={(event)=>{handleInputField(event,"price")}} className='border-2 rounded-lg text-lg w-full md:w-1/3 h-1/2 p-2 mt-5 md:mt-0' placeholder="Price" type='number' />
          <div onClick={()=>{handleAddMembership()}} className='text-lg border-2 p-1 w-1/4 md:w-auto mt-10 md:mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Add + </div>
        </div>
        <ToastContainer/>
      </div>
  )
}

export default MemberShipAdd