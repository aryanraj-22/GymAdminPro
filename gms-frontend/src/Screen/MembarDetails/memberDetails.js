import React, { useState,useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link,useNavigate,useParams } from 'react-router-dom';
import Switch from "react-switch";
import axios from 'axios';
import { URL } from '../../url/url';
import { ToastContainer,toast } from 'react-toastify';
const MemberDetails = () => {
    const [member,setMember] = useState(null);
    const [membership,setmembership] = useState([])
    const [status, setStatus] = useState(false)
    const [renew, setRenew] = useState(false)
    const [planMember,setPlanMember] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    const fetchDetail = async ()=>{
        await axios.get(`${URL}/members/get-member/${id}`,{withCredentials:true}).then((resp)=>{
            setMember(resp.data.member);
            setStatus(resp.data.member.status)
            toast.success(resp.data.message,{
                position:"bottom-center"
            });
            console.log(resp.data)
        }).catch(err=>{
            console.log(err)
            toast.error(err?.response?.data?.error || 'Something wrong in fetching details');
        })
    }
    console.log(planMember)
    useEffect(()=>{
        fetchDetail()
        fetchMembership();
        
    },[])

    const fetchMembership =async()=>{
        await axios.get(`${URL}/plans/get-membership`,{ withCredentials: true}).then((resp)=>{

            setmembership(resp.data.membership);
            setPlanMember(resp.data.membership[0]._id)
            
          }).catch(err=>{
            toast.error(err?.response?.data?.error || "Something went wrong");
          })
    }

    const changeStatus = async()=>{
        let statuss = status==="Active"?"Pending":"Active";
        await axios.post(`${URL}/members/change-status/${id}`,{status:statuss},{withCredentials:true}).then((resp)=>{
            toast.success(resp.data.message,{
                position:"bottom-center"
            });
            setStatus(statuss)
            
        }).catch(err=>{
            console.log(err)
            toast.error(err?.response?.data?.error || 'Something went wrong while changing status');

        })
    
    }

    const handleOnChangeSelect = (event) => {
        let value = event.target.value;
        setPlanMember(value);
        
      };

    const handleUpdateMembership = async()=>{
        await axios.put(`${URL}/members/update-member-plan/${id}`,{membership:planMember},{withCredentials:true}).then((resp)=>{
            setMember(resp.data.member);
            toast.success(resp.data.message);
        }).catch(err=>{
            console.log(err)
           toast.error(err?.response?.data?.error || 'Something went wrong while updating membership');
        })
    }

    const isDateInPast = (inputDate) => {
        const today = new Date(); 
        const givenDate = new Date(inputDate); 
      
        return givenDate < today; 
      };

    return (
        <div className='text-black p-5 w-full md:w-3/4'>
            <Link to={'#'} onClick={()=>{navigate(-1)}} className='border-2 w-full text-xl font-sans text-white p-2 rounded-xl bg-slate-900'>
                <ArrowBackIcon /> Go Back
            </Link>
            <div className='mt-10 p-2 '>
                <div className='md:w-[100%] h-fit lg:flex'>
                    <div className='lg:w-1/3  mx-auto'>
                        <img className='w-full  mx-auto' src={member?.profilePic} />
                    </div>
                    <div className='w-2/3 mt-5 text-xl p-5'>
                        <div className='mt-1 mb-2 text-2xl font-semibold'>Name : {member?.name}</div>
                        <div className='mt-1 mb-2 text-2xl font-semibold '>Mobile : {member?.mobileNo}</div>
                        <div className='mt-1 mb-2 text-2xl font-semibold '>Address : {member?.address}</div>
                        <div className='mt-1 mb-2 text-2xl font-semibold '>Joined Date : {member?.createdAt.slice(0,10).split('-').reverse().join('-')}</div>
                        <div className='mt-1 mb-2 text-2xl font-semibold '>Next Bill Date : {member?.nextBillDate.slice(0,10).split('-').reverse().join('-')}</div>
                        <div className='mt-1 mb-2 flex gap-4 text-2xl font-semibold'>Status : <Switch onColor='#6366F1' checked={status=="Active"} onChange={() => changeStatus()} /></div>
                        {isDateInPast(member?.nextBillDate) && <div onClick={() => { setRenew(prev => !prev) }} className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${renew && status ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' : null} w-full mt-5 md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>Renew</div>}
                    </div>
                </div>

                {renew && status==="Active" && <div className='rounded-lg p-3 mt-5 mx-auto mb-5 h-fit bg-slate-50 md:w-[50%]'>
                    <div className='w-full'>
                        <div className=' my-5'> 
                            <div>Membership</div>
                            <select name="options" value={planMember} onChange={handleOnChangeSelect} className='w-full border-2 p-2 rounded-lg'>
                                {
                                    membership.map((item,ind)=>{
                                        return <option key={ind} value={item._id}>{item.months} Month Membership</option>
                                    })
                                }
                                
                                
                            </select>
                        </div>

                        
                        <div  className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${renew ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' : null} w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`} onClick={()=>{handleUpdateMembership()}}>Save</div>
                    </div>
                </div>}


            </div>
            <ToastContainer/>
        </div>
    )
}

export default MemberDetails