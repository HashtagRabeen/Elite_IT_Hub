
import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
    <div className="bg-slate-100 py-12 px-4 sm:px-8 lg:px-24">
      <div className="flex flex-col lg:flex-row items-start lg:items-start gap-30">
        {/* Left section */}
        <div className="lg:w-[420px] flex-shrink-0">
          <div className="text-4xl font-bold mb-6">
            <h1>See how our students</h1>
            <p className="text-red-500">make an impact</p>
          </div>
          <div className="flex items-center mb-6">
            <div className="w-28 border-r-2 border-[#495057] flex justify-center">
              <FaGraduationCap size={90} />
            </div>
            <div className="ml-5 text-sm sm:text-base font-semibold">
              <p>
                Certified professionals with essential skills have high chance
                receiving job offer sooner comparatively!
              </p>
            </div>
          </div>
          <NavLink
            to="/success-story"
            className="flex items-center text-blue-600 mt-5"
          >
            Read more success stories{" "}
            <FaArrowRight size={15} className="ml-1 mt-1" />
          </NavLink>
        </div>

        {/* Right section */}
        {success.length > 0 && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10 flex-1">
            {success.slice(0, 2).map((item) => (
              <div
                key={item._id}
                className="flex flex-col flex-1 min-w-[250px] max-w-[320px] h-[280px] items-center font-sans shadow-md shadow-slate-200 rounded-lg bg-white"
              >
                <div className="rounded-full h-24 w-24 overflow-hidden relative -mt-10">
                  <img
                    src={`http://localhost:9000/upload/${item.image}`}
                    alt=""
                    className="h-24 rounded-full"
                  />
                </div>
                <div className="w-60 flex items-center flex-col mt-2">
                  <h1 className="text-[#212529] font-semibold text-[18px] w-60 text-center h-8">
                    {item.name}
                  </h1>
                  <h1>{item.position}</h1>
                  <h1 className="text-blue-700 w-60 text-center">@{item.workAt}</h1>
                  <h1 className="mt-5 text-[14px] text-[#495057] font-semibold">
                    College/Faculty
                  </h1>
                  <h1 className="text-[12px] mt-3">
                    {item.college}/{item.faculty}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Success2;

