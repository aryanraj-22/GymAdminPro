import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MemberCard from '../../component/MemberCard/memberCard';
import { getMonthlyJoined,threeDayExpire,fourToSevenDaysExpire,expired,inActiveMembers } from '../../component/helper';
const GeneralUser = () => {
    // monthlyJoined threeDayExpire fourToSevenDaysExpire expired inActiveMembers recentJoinee
    const [header ,setHeader] = useState("");
    const [data,setData] = useState([]);
    const [progressbar,setProgressBar] = useState(false)
    useEffect(()=>{
        const funct = sessionStorage.getItem("func")
        
        functionCall(funct)
    },[])

    const functionCall = async (funct) =>{
        // setHeader(funct)
        setProgressBar(true)

        switch(funct){

            case "monthlyJoined":
                
                var data = await getMonthlyJoined();
                setData(data.members)
                setProgressBar(false)
                
                setHeader("Monthly Joined")

                break;
            case "threeDayExpire":
                var data = await threeDayExpire();
                setData(data.members)
                setProgressBar(false)
                
                setHeader("Expring In 3 Days")
                break;
            case "fourToSevenDaysExpire":
                var data = await fourToSevenDaysExpire();
                setData(data.members)
                setProgressBar(false)
                
                setHeader("Expring In 4-7 Days")
                break;
            case "expired":
                var data = await expired();
                setData(data.members)
                setProgressBar(false)
                
                setHeader("Expired")
                break;
            case "inActiveMembers":
                var data = await inActiveMembers();
                setData(data.members)
                setProgressBar(false)
                
                setHeader("InActive")
                break;
            
        }
    }




    return (
        <div className='text-black p-5 w-full md:w-3/4 flex-col '>
            <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
                <Link to='/dashboard' className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' ><ArrowBackIcon /> Back To Dashboard </Link>
            </div>

            <div className='mt-5 text-xl text-slate-900'>{data.length} {header} Members</div>

            <div className='bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]'>

                {
                    data && data.map((item,index)=>{
                        return(
                            <MemberCard key={index} item={item}  />
                        );
                    })
                }
                

            </div>

        </div>
    )
}

export default GeneralUser