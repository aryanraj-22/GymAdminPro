import React,{useState,useEffect,useRef} from 'react';
import './sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { URL } from '../../url/url';
const Sidebar = () => {
    
    
    const [greeting, setGreeting] = useState("");
    const location = useLocation(); // Get the current location
    const navigate = useNavigate();
    const [gymName,setGymName] = useState('');
    const [gymProfilePic,setgymprofilePic] = useState('https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg')
    const greetingMessage=()=>{
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good Morning 🌞");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon ☀️");
        } else if (currentHour < 21) {
            setGreeting("Good Evening 🌕");
        } else {
            setGreeting("Good Night 🌜");
        }
    }

    useEffect(() => {
        
        greetingMessage()
        setGymName(localStorage.getItem('gymName'));
        setgymprofilePic(localStorage.getItem('gymPic'));
        
    }, []);

    const handleLogout = async()=>{
        await axios.post(`${URL}/auth/logout`,{},{ withCredentials: true}).then((res)=>{
            localStorage.clear();
            setTimeout(() => {
                navigate('/')
                window.location.reload();
            }, 2000);

            console.log("Logout ")
          }).catch(err=>{
            console.log(err)
          })
    }
  return (
    <div className='w-1/4 bg-indigo-900 text-white p-5 flex-col font-extralight text-3xl hidden md:block'>
        <div className='text-center text-3xl font-bold text-white mb-4'>
            {gymName}
        </div>

        <div className='flex gap-0 p-3 mb-10'>
            <img className='w-20 h-20 rounded-full border-2 border-indigo-500 object-cover' src={gymProfilePic}/>
            <div className='flex-col pl-7'>
                <p className='text-lg'>{greeting}</p>
                <p className='text-lg font-semibold'>admin</p>
            </div>
        </div>

        <div className='flex-col mt-10 pt-10 border-t-2 border-white'>
            <Link to={'/dashboard'} className={`flex gap-5 mb-5 bg-slate-900 ${location.pathname==="/dashboard"?"border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500":""} rounded-lg p-2 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:border-black`}>
                <HomeIcon/>
                <div className='text-lg font-semibold'>
                    Dashboard
                </div>
            </Link>

            <Link to={'/members'}   className={`flex gap-5 mb-5 bg-slate-900 ${location.pathname==="/members"?"border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500":""} rounded-lg p-2 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:border-black`}>
                <PeopleAltIcon/>
                <div className='text-lg font-semibold'>
                    Members
                </div>
            </Link>

            
            <div onClick={()=>{handleLogout()}} className={`flex gap-5 mb-5 bg-slate-900  rounded-lg p-2 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:border-black`}>
                <LogoutIcon/>
                <div className='text-lg font-semibold'>
                    Logout
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar