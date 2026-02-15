import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 2,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
function Success2() {
  const [success, setSuccess] = useState([]);

  const getSuccess = async () => {
    let response = await fetch("http://localhost:9000/api/getSuccess");
    response = await response.json();
    console.log(response.showSucess);
    setSuccess(response.showSucess);
  };
  useEffect(() => {
    getSuccess();
  }, []);
  return (
    <div className=" py-16 bg-slate-100">
      <div className=" mt-12 mx-16 flex">
        <div className="w-[420px] mx-5 ">
          <div className="text-4xl font-bold">
            <h1 className="">See how our students</h1>
            <p className="text-red-500">make an impact</p>
          </div>
          <div className=" w-28 mt-2 border-r-2 border-[#495057]">
            <FaGraduationCap size={90} />
          </div>
          <div className="w-72 ml-[125px] relative bottom-[84px] font-semibold">
            <p>
              Certified professionals with essential skills have high chance
              receiving job offer sooner comparatively!
            </p>
          </div>
          <NavLink
            to="/success-story"
            className="flex items-center text-blue-600"
          >
            Read more success stories{" "}
            <FaArrowRight size={15} className="ml-1 mt-1" />
          </NavLink>
        </div>
        {success.length > 0 ? (
          <div className="flex-1 min-w-0">
            <Carousel
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
            >
              {success.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex flex-col m-auto py-12 items-center font-sans shadow-md shadow-slate-200 rounded-lg bg-white mx-2"
                  >
                    <div className="rounded-full h-24 w-24 overflow-hidden relative bottom-10">
                      <img
                        src={`http://localhost:9000/upload/${item.image}`}
                        alt=""
                        className="h-24 rounded-full"
                      />{" "}
                    </div>
                    <div className="w-60 flex items-center flex-col">
                      <h1 className=" text-[#212529] font-semibold text-[18px] w-60 text-center h-8">
                        {item.name}
                      </h1>
                      <h1>{item.position}</h1>
                      <h1 className=" text-blue-700 w-60 text-center">
                        @{item.workAt}
                      </h1>
                      <h1 className=" mt-5 text-[14px] text-[#495057] font-semibold">
                        College/Faculty
                      </h1>
                      <h1 className=" text-[12px] mt-3">
                        {item.college}/{item.faculty}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Success2;
