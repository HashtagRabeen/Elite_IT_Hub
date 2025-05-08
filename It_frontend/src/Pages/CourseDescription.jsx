import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { FaRegLightbulb } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbChecklist } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import { CartContext } from "../Context/CartProvider";
import { Bounce, toast } from "react-toastify";

function CourseDescription() {
  const [singleCourse, setSingleCourse] = useState({});

  const navigate=useNavigate();

  const {cartDispatch}=useContext(CartContext);
  const overviewRef = useRef(null);
  const benefitRef = useRef(null);
  const syllabusRef = useRef(null);

  // const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });
  const scrollTo = (ref) => {
    if (ref.current) {
      const offset = -78;
      const top = ref.current.offsetTop + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  

  const { id } = useParams();
  console.log(id);

  const getSingleCourse = async () => {
    let response = await fetch(`http://localhost:9000/api/getCourseById/${id}`);
    response = await response.json();
    setSingleCourse(response.singleCourse);
    // console.log(response.singleCourse.benefits);
  };

  useEffect(() => {
    if (id) {
      getSingleCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      <div className="bg-[#147AA6]">
        <div className="w-[80%] m-auto flex h-[500px] rounded-xl">
          <div className=" w-[60%] h-[400px] flex flex-col justify-center mt-13 shadow-md rounded-xl border-2 border-gray-300 ml-3 bg-white">
            <h1 className="text-5xl font-bold pl-3 mt-5">
              {singleCourse.name}
            </h1>
            <div className="flex text-xl font-semibold pl-3 gap-10 mt-4">
              <h1 className="flex gap-2 justify-center items-center">
                <SlCalender size={18} className="ml-2" />
                {singleCourse.duration}
              </h1>
              <p className="flex gap-2 justify-center items-center pl-2">
                <TbChecklist size={20} className="ml-1" />
                {singleCourse.scope}
              </p>
            </div>
            <p className="mt-5 flex font-semibold pl-5 text-[#212529]">
              <FaRegLightbulb size={20} className="text-yellow-400 mt-[3px] pr-2" />
              Training Mode: Both, Physical & Live Online Classes
            </p>
            <div className="mt-4 pl-5">
              <p>{singleCourse.technologies}</p>
            </div>
            <div className="mt-4 pl-5 text-[#f85704] font-semibold">
              <p>Rs. {singleCourse.fee}</p>
            </div>

            <div className=" mt-5 flex gap-5 ml-10">
              <NavLink to="/enrollment" state={singleCourse} className="px-4 py-3 rounded-lg bg-[#0054C0] text-white font-semibold flex">
                ENROLL NOW <FaArrowRight size={20} className="ml-3 mt-1" />
              </NavLink>

              <button
              onClick={()=>{
                   navigate("/inquiry",{state:singleCourse})  
              }}
              className=" px-4 py-3 rounded-lg bg-[#ff3f00] text-white font-semibold flex">
                SEND AN INQUIRY
                <FaArrowRight size={20} className="ml-3 mt-1" />
              </button>
              <button onClick={()=>{
                   cartDispatch({type:"Add_To_Cart",payload:{...singleCourse}})
                   toast.success(`${singleCourse.name} Added to Cart`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
              }} className=" px-4 py-3 rounded-lg bg-[#9C27B0] text-white font-semibold flex">
                    Add to Cart
                <FaArrowRight size={20} className="ml-3 mt-1" />
              </button>

            </div>
          </div>
          <div className="h-[300px] flex ml-15 mt-23 shadow-lg rounded-xl">
            <img
              src={`http://localhost:9000/upload/${singleCourse.image}`}
              alt=""
              className="h-[300px]  rounded-xl border-2 border-gray-200"
            />
          </div>
        </div>
      </div>
      <div className=" flex gap-5 items-center h-20 pl-40 font-semibold text-[#495057] sticky top-0 z-50 bg-white shadow-lg">
        <NavLink
          onClick={() => scrollTo(overviewRef)}
          className="hover:text-blue-500"
        >
          Course Overview
        </NavLink>
        <NavLink
          onClick={() => scrollTo(benefitRef)}
          className="hover:text-blue-500"
        >
          Course Benefits
        </NavLink>
        <NavLink
          onClick={() => scrollTo(syllabusRef)}
          className="hover:text-blue-500"
        >
          Syllabus
        </NavLink>
        <NavLink to="/success-story"
        className="hover:text-blue-500"
        >
          Success Stories
        </NavLink>
      </div>
      <div>
        <div className="ml-40">
          <div ref={overviewRef} >
            <div>
              <h1 className="text-2xl font-bold h-16 flex items-center text-[#212529]">
                Course Overview
              </h1>
            </div>
            <div className=" w-[50%]">
              <h1 className="font-bold text-2xl text-[#212529]">
                {singleCourse.name} in Nepal
              </h1>
              <p className="mt-3 text-lg font-sans">{singleCourse.overview}</p>
            </div>
          </div>
            <div ref={benefitRef}>
              <h1 className="text-2xl font-bold h-16 flex items-center text-[#212529]">
                Benefits
              </h1>
            </div>
            <div className="w-[50%]">
              <h1 className="font-semibold text-xl text-[#212529]">
                Why {singleCourse.name} Development course?
              </h1>
            </div>
            <div>
              {singleCourse.benefits && singleCourse.benefits.length > 0 ? (
                <div>
                  {singleCourse.benefits.map((benefit, index) => {
                    return (
                      <div key={index}>
                        <li className="mt-4">{benefit}</li>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>

          <div ref={syllabusRef}>
            <h1 className="text-2xl font-bold h-18 flex items-center text-[#212529]">
              Syllabus
            </h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold h-8 flex items-center text-[#212529]">
              What you'll learn
            </h1>
          </div>
          <div>
            {singleCourse.syllabus && singleCourse.syllabus.length > 0 ? (
              <ol className="pl-8 bg-blue-100 w-[40%] p-2 mb-2">
                {singleCourse.syllabus.map((item, index) => {
                  return (
                    <div key={index} className="">
                      <li className="mt-4 pl-3 list-decimal">{item}</li>
                    </div>
                  );
                })}
              </ol>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
