
import './App.css';
import Sidebar from './component/Sidebar/sidebar';
import { HashRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import Dashboard from './Screen/Dashboard/dashboard';
import Member from './Screen/Members/member';
import MemberDetails from './Screen/MembarDetails/memberDetails';
import GeneralUser from './Screen/GeneralUser/generalUser';
import { useEffect, useState } from 'react';
import Home from './Screen/Home/home';
import axios from 'axios';

function App() {
  const [isLogin,setIsLogin] = useState(false);
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("isLogin")){
      setIsLogin(true)
    }else{
      navigate('/')
    }
  },[localStorage.getItem("isLogin")])

  
  return (
    <div className="w-full  text-white App flex">
      
      {isLogin && <Sidebar />}
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/members' element={<Member />} />
        <Route path='/:member' element={<GeneralUser />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/member/:id' element={<MemberDetails />} />
      </Routes>
    
    </div>
  );
}

export default App;
