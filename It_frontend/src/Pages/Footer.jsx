
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { BsInstagram, BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { useEffect, useState } from "react";

function Footer() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/getCourse");
        const data = await response.json();
        setLists(data.showCourse);
      } catch (err) {
        console.log(err);
      }
    };
    getCourseList();
  }, []);

  return (
    <footer className="bg-[#1e293b] text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-xl text-blue-700 mb-4">Quick Links</h2>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/courses">Courses</NavLink>
              <NavLink to="/aboutus">About Us</NavLink>
              <NavLink to="/inquiry">Admission Process</NavLink>
              <NavLink to="/refundpolicy">Refund Policy</NavLink>
              <NavLink to="/">Contact</NavLink>
            </nav>
          </div>

          {/* Popular Courses */}
          <div>
            <h2 className="font-bold text-xl text-blue-700 mb-4">Popular Courses</h2>
            <nav className="flex flex-col space-y-2">
              {lists.length > 0 ? (
                lists.slice(0, 6).map((course) => (
                  <NavLink
                    key={course._id}
                    to={`/courseDescription/${course._id}`}
                  >
                    {course.name}
                  </NavLink>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="font-bold text-xl text-blue-700 mb-4">Contact Us</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-start gap-2">
                <FaLocationDot size={22} />
                <p>Narephat 32, Koteshwor, Kathmandu</p>
              </div>
              <div className="flex items-center gap-2">
                <BsFillTelephoneFill size={22} />
                <p>9851344071, 9806393939</p>
              </div>
              <div className="flex items-center gap-2">
                <MdMail size={22} />
                <p>ithub@elite.com</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Elite IT Hub</h2>
              <p className="text-sm sm:text-base">
                Providing quality IT education and training since 2015. Our mission is to bridge the gap between academia and industry requirements.
              </p>
            </div>
            <div className="flex mt-4 gap-4">
              <NavLink to="https://www.facebook.com/profile.php?id=61552857928172" target="_blank" className="h-10 w-10 flex justify-center items-center bg-blue-800 rounded-full">
                <FaFacebookF size={20} />
              </NavLink>
              <NavLink to="#" className="h-10 w-10 flex justify-center items-center bg-blue-500 rounded-full">
                <CiTwitter size={20} />
              </NavLink>
              <NavLink to="#" className="h-10 w-10 flex justify-center items-center bg-green-600 rounded-full">
                <FaWhatsapp size={20} />
              </NavLink>
              <NavLink to="#" className="h-10 w-10 flex justify-center items-center bg-pink-600 rounded-full">
                <BsInstagram size={20} />
              </NavLink>
            </div>
          </div>

        </div>
       {/* copyright section */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm sm:text-base">
          &copy; 2008 - 2025. Elite IT Hub Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

