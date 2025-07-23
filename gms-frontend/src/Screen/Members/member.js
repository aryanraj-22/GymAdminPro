import React, { useState,useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SearchIcon from '@mui/icons-material/Search';
import MemberCard from '../../component/MemberCard/memberCard';
import Modal from '../../component/Modal/modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import jsonData from './testData.json'
import AddMember from '../../component/AddMember/addMember';
import MemberShipAdd from '../../component/AddMemberShip/memberShipAdd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../component/Loader/loader';
import { URL } from '../../url/url';
const Member = () => {
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [membershipModal, addMembershipModal] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [noOfPage,setNoOfPage] = useState(0);
  const [startFrom,setSTartFrom] = useState(0);
  const [endTo,setEndTo] = useState(9);
  const [search,setSearch] = useState("");
  const [skip,setSkip] = useState(0);
  const [limit,setLimit] = useState(9);
  const [loader,setLoader] = useState(false);
  const [isSearcModeOn,setIsSearchModeOn] = useState(false);

  useEffect(()=>{
    // setData(jsonData.data)
    // var a = jsonData.total
    // setTotalData(a)
    // var addExtra = a%9===0?0:1;
    // var totalD = parseInt(a/9) + addExtra;
    // setNoOfPage(totalD);
    fetchData(0,9);
  },[])

  const fetchData=async(skip,limit)=>{
    setLoader(true)
    await axios.get(`${URL}/members/all-member?skip=${skip}&limit=${limit}`,{withCredentials:true}).then((res=>{
      toast.success(res.data.message,{
        position:"bottom-left"
      })
      let totalData = res.data.totalMembers;
      setTotalData(totalData);
      var addExtra = totalData%9===0?0:1;
      var totalD = parseInt(totalData/9) + addExtra;
      setNoOfPage(totalD);
      setData(res.data.members)
      if(totalData===0){{
        setSTartFrom(-1);
        setEndTo(0)
      }}else if(totalData<10){
        setSTartFrom(0);
        setEndTo(totalData)
      }
      setTimeout(()=>{
        setLoader(false)

      },[2000])

    })).catch(error=>{
      console.log(error)
      toast.error("Something Unexpected occuring")
      setLoader(false)
    })
  }

  const prevPagination =()=>{
    if(currentPage!==1){
      var curPage = currentPage-1;
      setCurrentPage(curPage)

      var from = (curPage-1)*9;         
      var to = (curPage*9)
      setSTartFrom(from)
      setEndTo(to);
      let skp = skip-9;
      setSkip(skp);
      fetchData(skp,limit)
    }
  }

  const nextPagination =()=>{
    if(currentPage!==noOfPage){
      var curPage = currentPage+1;
      setCurrentPage(curPage)

      var from = (curPage-1)*9;         
      var to = (curPage*9)
      if(to>totalData){
        to = totalData;
      }
      setSTartFrom(from)
      setEndTo(to);
      let skp = skip+9;
      setSkip(skp);
      fetchData(skp,limit)
    
    }
  }

  const modalCloseFunc = () => {
    setAddMemberModal(prev => !prev)
  }
  const modalMemberCloseFunc = () => {
    addMembershipModal(prev => !prev)
  }

  const handleSearch = async()=>{
    if(search!==""){
      setIsSearchModeOn(true)
      setLoader(true)
      await axios.get(`${URL}/members/searched-members?searchTerm=${search}`,{withCredentials:true}).then(res=>{
        console.log(res.data)
        let totalData = res.data.totalMembers;
        setData(res.data.members);
        setTotalData(totalData);
        setTimeout(()=>{
          setLoader(false)

        },[2000])
      }).catch(err=>{
        setLoader(false)
        toast.error("Something Went Wrong")
      })
    }else{
      if(isSearcModeOn){
        window.location.reload();

      }else{
        toast.error("Please Enter any Value")
      }
    }
  }


  return (
    <div className='text-black p-5 w-full md:w-3/4 flex-col '>
      <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
        <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={modalCloseFunc}> Add Member <FitnessCenterIcon /></div>
        <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={modalMemberCloseFunc}> Membership <AddIcon /></div>

      </div>
      <Link to='/dashboard' className='mt-2'><ArrowBackIcon /> Back to Dashboard</Link>

      <div className='mt-5 w-full md:w-1/2 flex gap-2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type='text' className='border-2 w-full p-2 rounded-lg' placeholder='Search By Name or Mobile No' />
        <div onClick={handleSearch} className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'><SearchIcon /></div>
      </div>

      <div className='mt-5 text-xl md:flex  md:justify-between text-slate-900'>
        <div>Total Members {isSearcModeOn?totalData:""}</div>
        {!isSearcModeOn && <div className='flex gap-5'>
          <div>{startFrom+1} - {endTo} of {totalData} Members</div>
          {totalData>9 && <div onClick={()=>prevPagination()} className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage===1?'bg-gray-200 text-gray-50':""}`}>
            <ChevronLeftIcon />
          </div>}
          {totalData>9 && <div onClick={()=>nextPagination()} className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage===noOfPage?'bg-gray-200 text-gray-50':""}`}>
            <ChevronRightIcon />
          </div>}
        </div>}
      </div>

      <div className='bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto md:h-[65%]'>

        {
          data.map((item,ind)=>{
            return(
              <MemberCard key={ind} item={item} />

            );
          })
        }
        

      </div>
      {addMemberModal ? <Modal title="Add New Member" modalCloseFunc={modalCloseFunc} addMemberModalContent={<AddMember />} /> : null}
      {membershipModal ? <Modal title="Membership" modalCloseFunc={modalMemberCloseFunc} addMemberModalContent={<MemberShipAdd/>} /> : null}

      <ToastContainer/>
      {
        loader && <Loader/>
      }

    </div>
  )
}

export default Member