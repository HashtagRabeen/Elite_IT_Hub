
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RiComputerLine } from "react-icons/ri";
import { FaCertificate } from "react-icons/fa6";
import Success2 from "../Components/Home/Success2";
import StudentVoice from "../Components/Home/StudentVoice";
import { FaArrowRight } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [courses, setCourses] = useState([]);

  // Slide data with bgColor for each slide
  const slides = [
    {
      title: "10% Off January Batch",
      description: "Limited time offer for early enrollments",
      // bgColor: "bg-red-400",
    },
    {
      title: "New Python Course Launched",
      description: "Start your programming journey today",
      // bgColor: "bg-blue-500",
    },
    {
      title: "Web Development Masterclass",
      description: "Become a full-stack developer in 12 weeks",
      // bgColor: "bg-green-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const getCourse = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getCourse");
      if (response.ok) {
        response = await response.json();
        setCourses(response.showCourse);
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
    <div className="w-full">
      {/* Slider Section */}
      <div
        className={`relative overflow-hidden h-[500px] bg-[#184f81] sm:h-[450px] flex flex-col justify-center px-4 sm:px-10 md:px-20 text-white ${slides[currentSlide].bgColor}`}
      >
        {slides.map((slide, index) => (
          <div key={index}>
            {currentSlide === index && (
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl">{slide.description}</p>
                <NavLink
                  to="/inquiry"
                  className="inline-flex items-center justify-center bg-white text-black rounded-lg px-6 py-3 mt-4 font-semibold hover:bg-gray-200 transition"
                >
                  SEND AN ENQUIRY <FaArrowRight size={20} className="ml-2" />
                </NavLink>
              </div>
            )}
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-4 sm:px-10 md:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:-translate-y-2 transition">
            <RiComputerLine size={50} className="mb-4 text-[#184f81]" />
            <h3 className="font-bold text-2xl mb-2">IT Training</h3>
            <p className="text-gray-600">
              Comprehensive courses in various IT domains with hands-on projects
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:-translate-y-2 transition">
            <FaCertificate size={50} className="mb-4 text-[#184f81]" />
            <h3 className="font-bold text-2xl mb-2">Certification</h3>
            <p className="text-gray-600">
              Recognized certifications to boost your career opportunities
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:-translate-y-2 transition">
            <MdBusinessCenter size={50} className="mb-4 text-[#184f81]" />
            <h3 className="font-bold text-2xl mb-2">Corporate Workshops</h3>
            <p className="text-gray-600">
              Specialized workshops for corporate teams and organizations
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-10 md:px-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#04183F]">
            Our Featured Courses
          </h2>
          <p className="mt-4 text-gray-600">
            Our courses have multiple options that may match your own schedule.
            Browse to find the best fit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.slice(0, 4).map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <NavLink to={`/courseDescription/${course._id}`}>
                <img
                  src={`http://localhost:9000/upload/${course.image}`}
                  alt={course.name}
                  className="h-40 w-full object-cover"
                />
              </NavLink>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <NavLink
                  to={`/courseDescription/${course._id}`}
                  className="font-semibold text-xl hover:text-blue-700"
                >
                  {course.name}
                </NavLink>
                <h3 className="text-[#f85704] font-bold text-lg mt-2">
                  Rs.{course.fee}
                </h3>
                <p className="text-gray-500 mt-1 text-sm">
                  Category: {course.category}
                </p>
                <div className="flex gap-2 mt-4">
                  <NavLink
                    to={`/courseDescription/${course._id}`}
                    className="flex-1 bg-gray-600 text-white py-2 rounded text-center hover:bg-gray-700 transition"
                  >
                    View Details
                  </NavLink>
                  <NavLink
                    to="/enrollment"
                    state={course}
                    className="flex-1 bg-orange-500 text-white py-2 rounded text-center hover:bg-orange-600 transition"
                  >
                    Enroll Now
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <NavLink
            to="/courses"
            className="bg-[#147AA6] text-white px-6 py-3 rounded-3xl hover:bg-[#184f81] transition"
          >
            Explore More Courses
          </NavLink>
        </div>
      </div>

      {/* Success Stories & Student Voices */}
      <Success2 />
      <StudentVoice />
    </div>
  );
}

export default Home;
