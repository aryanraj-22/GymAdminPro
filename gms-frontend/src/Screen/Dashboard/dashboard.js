import React, { useState,useEffect,useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import AttributionIcon from '@mui/icons-material/Attribution';
import TechError from '../../component/TechError/techError';
import { Link } from 'react-router-dom';
const Dashboard = () => {

    // monthlyJoined threeDayExpire fourToSevenDaysExpire expired inActiveMembers recentJoinee


    const [profilePic, setProfilePic] = useState("https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg")
    const [accordianDashboard, setAccordianDashboard] = useState(false);
    const ref = useRef();

    useEffect(()=>{

        const checkIfClickedOutside = e =>{
            if(accordianDashboard && ref.current && !ref.current.contains(e.target)){
                setAccordianDashboard(false);
            }
        }
        document.addEventListener("mousedown",checkIfClickedOutside)
        return ()=>{
            document.removeEventListener("mousedown",checkIfClickedOutside)

        }
    },[accordianDashboard])

    const handleOnClickMenu = (value)=>{
        sessionStorage.setItem('func',value);
    }
    
    return (
        <div className='text-black p-5 relative w-full md:w-3/4'>
            <div className='w-full bg-slate-900 text-white rounded-lg flex  p-3 justify-between items-center'>
                
                    <MenuIcon sx={{ cursor: "pointer" }} onClick={()=>{setAccordianDashboard(prev=>!prev)}} />
                
                <img className='w-8 h-8 rounded-3xl border-2' src={profilePic} />
            </div>

            {
                accordianDashboard && <div ref={ref} className=' absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
                    <div>Hi Welcome to GymAdminPro</div>
                    
                </div>
            }
            <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-1 md:grid-cols-3 w-full pb-5 overflow-x-auto md:h-[80%]'>

                <Link to={'/members'} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                        <PeopleAltIcon sx={{color:"green",fontSize:"50px"}}/>
                        
                        <p className='text-xl my-3 font-semibold font-mono'>Joined Members</p>
                    </div>
                </Link>

                <Link to='/monthlyJoined' className='h-fit w-full border-2 bg-white rounded-lg cursor-pointer' onClick={()=>handleOnClickMenu("monthlyJoined")}>
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-white-500 to-red-500"></div>
                    <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
                        <SignalCellularAltIcon sx={{color:"purple",fontSize:"50px"}} />
                        
                        <p className='text-xl my-3 font-semibold font-mono'>Monthly Joined</p>
                    </div>
                </Link>

                <Link to={'/expireIn3Days'} className='h-fit w-full border-2 bg-white rounded-lg cursor-pointer' onClick={()=>handleOnClickMenu("threeDayExpire")}>
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
                        <AccessAlarmIcon sx={{color:"red",fontSize:"50px"}} />
                        
                        <p className='text-xl my-3 font-semibold font-mono'>Expiring within 3 days</p>
                    </div>
                </Link>
                
                <Link to={'/expireIn4_7Days'} className='h-fit w-full border-2 bg-white rounded-lg cursor-pointer' onClick={()=>handleOnClickMenu("fourToSevenDaysExpire")}>
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
                        <AccessAlarmIcon sx={{color:"red",fontSize:"50px"}} />
                        
                        <p className='text-xl my-3 font-semibold font-mono'>Expiring within 4-7 days</p>
                    </div>
                </Link>

                <Link to={'/expired'} className='h-fit w-full border-2 bg-white rounded-lg cursor-pointer'  onClick={()=>handleOnClickMenu("expired")}>
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
                        <ErrorIcon sx={{color:"red",fontSize:"50px"}} />
                        
                        <p className='text-xl my-3 font-semibold font-mono'>Expired</p>
                    </div>
                </Link>

                <Link to={'/inactiveMembers'} className='h-fit w-full border-2 bg-white rounded-lg cursor-pointer'  onClick={()=>handleOnClickMenu("inActiveMembers")}>
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-purple-500 to-yellow-500"></div>
                    <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
                        <ReportIcon sx={{color:"brown",fontSize:"50px"}} />
                        
                        <p className='text-xl my-3 font-semibold font-mono'>InActive members</p>
                    </div>
                </Link>

                
                
            </div>

            <TechError/>
        </div>
    )
}

export default Dashboard