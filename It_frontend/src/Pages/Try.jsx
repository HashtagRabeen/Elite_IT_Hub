import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Try() {
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
    <div>
      <div className="border-2 border-black">
      <span className="font-bold text-xl text-blue-700 h-10">Popular Courses</span>
            {lists.length > 0 ?(<div>
                {lists.slice(0,6).map((list,index)=>{
                     return(
                        <div key={index} className="flex flex-col w-[20%] border-2 border-black">
                            <NavLink className="flex h-10 items-center font-semibold">{list.name}</NavLink>
                        </div>
                     )
                })}
            </div>):(<div></div>)}
      </div>
    </div>
  )
}

export default Try
