import { NavLink } from "react-router-dom"
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { MdMail } from "react-icons/md";
import { useEffect, useState } from "react";




//bg-[#212529] text-white
function Footer() {
  const[lists,setLists]=useState([]);
  
    const getCourseList=async()=>{
      try{
          let response=await fetch("http://localhost:9000/api/getCourse");
          response=await response.json();
          setLists(response.showCourse);
      }
      catch(err){
          console.log(err);
      }
    }
    useEffect(()=>{
       getCourseList();
    },[])
  return (
    <div className="bg-[#1e293b] pt-[2px] pb-[2px]">
        <div className="w-[80%] m-auto h-[420px]">
          <div className=" flex gap-20 mt-20 text-[#FFFFFF]">
            <div className="flex flex-col w-[20%]"><span className="font-bold text-xl h-10 text-blue-700"> Quick Links</span>
                <NavLink to="/" className=" flex h-10 items-center font-semibold">Home</NavLink>
                <NavLink to="/courses" className=" flex h-10 items-center font-semibold">Courses</NavLink>
                <NavLink className=" flex h-10 items-center font-semibold ">About Us</NavLink>
                <NavLink className=" flex h-10 items-center font-semibold ">Admission Process</NavLink>
                <NavLink to="/refundpolicy" className=" flex h-10 items-center font-semibold ">Refund Policy</NavLink>
                <NavLink className=" flex h-10 items-center font-semibold">Contact</NavLink>
            </div>
            <div className="flex flex-col w-[20%]"><span className="font-bold text-xl text-blue-700 h-10">Popular Courses</span>
             {lists.length > 0 ?(<div>
                {lists.slice(0,6).map((list,index)=>{
                     return(
                        <div key={index}>
                            <NavLink to={`/courseDescription/${list._id}`} className="flex h-10 items-center font-semibold">{list.name}</NavLink>
                        </div>
                     )
                })}
            </div>):(<div></div>)}
            </div>
             <div className=" flex flex-col w-[25%]"><span className="font-bold text-xl text-blue-700 h-10">Contact Us</span>
                <NavLink className="flex h-15 items-center font-semibold gap-2"><FaLocationDot size={22}
                 className="mb-4 ml-2"/>
                Narephat 32, Koteshwor, Kathmandu</NavLink>
                <NavLink className="flex h-10 items-center font-semibold gap-2">
                <BsFillTelephoneFill  size={22} className=" ml-2"/>
                9851344071, 9806393939</NavLink>
                <NavLink className="flex h-10 items-center font-semibold gap-2">
                <MdMail size={22} className="ml-2" />
                ithub@elite.com</NavLink>
             </div>
            <div className="w-[35%]">
              <div className=" text-3xl font-semibold h-12">
                <h1 >Elite IT Hub</h1>
              </div>
              <div className=" text-xl mt-6 font-[sans]">
                <p>Providing quality IT education and training since 2015. 
                Our mission is to bridge the gap between academia and industry requirements.</p>
              </div>
              <div className="flex gap-5 h-18 items-center">
                 <NavLink to="https://www.facebook.com/profile.php?id=61552857928172" target="_blank" className="h-10 w-10 flex justify-center items-center bg-blue-800 rounded-full"><FaFacebookF size={25}/></NavLink>
                 <NavLink className="h-10 w-10 flex justify-center items-center bg-blue-500 rounded-full"><CiTwitter size={25}/></NavLink>
                 <NavLink className="h-10 w-10 flex justify-center items-center bg-green-600 rounded-full"><FaWhatsapp size={25}/></NavLink>
                 <NavLink className="h-10 w-10 flex justify-center items-center bg-pink-600 rounded-full"><BsInstagram  size={25}/> </NavLink>
              </div>
            </div>
          </div>
          <div className=" border-gray-600 border-t-2 mt-14 pt-5 flex justify-center font-sans text-white">
               Copyright &copy; 2008 - 2025. Elite IT Hub Pvt. Ltd. or its affiliate(s). All rights reserved.
          </div>
        </div>
    </div>
  )
}

export default Footer
