import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RiComputerLine } from "react-icons/ri";
import { FaCertificate } from "react-icons/fa6";
import Success2 from "../Components/Home/Success2";
import StudentVoice from "../Components/Home/StudentVoice";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [courses, setCourses] = useState([]); // state to store courses
  const slides = [
    {
      title: "10% Off January Batch",
      description: "Limited time offer for early enrollments",
      bgColor: "bg-red-400",
    },
    {
      title: "New Python Course Launched",
      description: "Start your programming journey today",
      bgColor: "bg-blue-500",
    },
    {
      title: "Web Development Masterclass",
      description: "Become a full-stack developer in 12 weeks",
      bgColor: "bg-green-500",
    },
  ];
  useEffect(() => {
    setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); //change slide every 5 seconds
  }, [slides.length]);

  const getCourse = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getCourse");
      if (response.ok) {
        response = await response.json();
        setCourses(response.showCourse);
        console.log(response);
      } else {
        console.log("Error fetching courses");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div>
      <div
        className={`relative overflow-hidden bg-[#184f81] h-[500px] pl-48 flex flex-col justify-center text-white ${slides[currentSlide].bgColor}`}
      >
        {/* slider container */}
        <div>
          {slides.map((slide, index) => (
            <div key={index}>
              {currentSlide === index && (
                <div className="space-y-4">
                  <div className="h-[100px] w-[40%] text-4xl font-bold flex items-center">
                    <h1>{slide.title}</h1>
                  </div>
                  <div className="w-[30%] text-xl">
                    <p>{slide.description}</p>
                  </div>
                  <NavLink className=" h-12 w-32 flex justify-center items-center bg-white text-black rounded-lg mt-10">
                    Enroll now
                  </NavLink>
                </div>
              )}
            </div>
          ))}
          <div className=" h-8 w-14 flex justify-center ml-[450px] mt-8 gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1} `}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[550px] bg-gray-100">
        <div className="font-bold text-4xl flex justify-center h-32 pt-20">
          <h1>Why Choose Us?</h1>
        </div>
        <div className="flex justify-center gap-10 items-center h-[76%] pb-5">
          <div className=" h-[250px] w-[350px] shadow-xl shadow-slate-300 rounded-lg bg-white flex flex-col hover:-translate-y-3 duration-300">
            <span className="font-bold text-2xl mt-15 flex flex-col justify-center items-center ">
              <RiComputerLine size={50} className="mb-4 text-[#184f81]" />
              IT training
            </span>
            <span className=" mt-4 pl-12 flex items-center justify-center">
              {" "}
              Comprehensive courses in various IT domains with hands-on projects
            </span>
          </div>
          <div className=" h-[250px] w-[350px] shadow-xl shadow-slate-300 rounded-lg bg-white flex flex-col hover:-translate-y-3 duration-300">
            <span className="font-bold text-2xl mt-15 flex flex-col justify-center items-center ">
              <FaCertificate size={50} className="mb-4  text-[#184f81]" />
              Certification
            </span>
            <span className=" mt-4 pl-12 flex items-center justify-center">
              {" "}
              Comprehensive courses in various IT domains with hands-on projects
            </span>
          </div>
          <div className=" h-[250px] w-[350px] shadow-xl shadow-slate-300 rounded-lg bg-white flex flex-col hover:-translate-y-3 duration-300">
            <span className="font-bold text-2xl mt-15 flex flex-col justify-center items-center ">
              <FaCertificate size={50} className="mb-4 text-[#184f81]" />
              Corporate Workshops
            </span>
            <span className=" mt-4 pl-12 flex items-center justify-center">
              {" "}
              Comprehensive courses in various IT domains with hands-on projects
            </span>
          </div>
        </div>
      </div>
      <div className="h-[520px] mt-5">
        <div className="">
          <h1 className="font-semibold text-3xl px-32 text-[#04183F]">
            Our featured courses
          </h1>
          <p className="px-32">
            Our courses have multiple options that may match your own time.
            Browse around to see what suits you.
          </p>
        </div>
        <div className="">
          {courses.length > 0 ? (
            <div className="flex justify-center  m-auto gap-10 p-5 flex-wrap mt-2">
              {courses.slice(0, 4).map((course) => {
                return (
                  <div
                    key={course._id}
                    className=" flex flex-col w-72 h-[340px] shadow-sm shadow-slate-300 rounded-xl "
                  >
                    <NavLink to={`/courseDescription/${course._id}`}>
                      <div className="flex justify-center ">
                        <img
                          src={`http://localhost:9000/upload/${course.image}`}
                          alt=""
                          className="h-40 rounded-xl"
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl mt-2 pl-10 hover:text-blue-700 ">
                          {course.name}
                        </h1>
                      </div>
                    </NavLink>
                    <div>
                      <h1 className="pl-10 font-bold text-xl text-[#f85704] mt-2">
                        Rs.{course.fee}
                      </h1>
                    </div>

                    <div>
                      <p className="pl-10 mt-2 text-sm">
                        Category: {course.category}
                      </p>
                    </div>
                    <div className="flex justify-center gap-x-3 mt-3 ">
                      <NavLink
                        to={`/courseDescription/${course._id}`}
                        className="px-4 py-2 rounded-sm bg-[#6C757D] text-white text-[15px]"
                      >
                        View Details
                      </NavLink>
                      <NavLink className="px-4 py-2 rounded-sm bg-[#FD7E14] text-white text-[15px]">
                        Enroll Now
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <NavLink
            to="/courses"
            className="hover:bg-[#184f81] bg-[#147AA6] text-white px-3 py-3 flex w-56 justify-center rounded-3xl"
          >
            Explore more courses
          </NavLink>
        </div>
      </div>
      <Success2 />
      <StudentVoice />
    </div>
  );
}

export default Home;
