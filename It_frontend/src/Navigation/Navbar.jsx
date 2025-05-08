import { NavLink } from "react-router-dom";

import {
  FaCertificate,
  FaChevronDown,
  FaCode,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import { FaPython } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { VscCompassActive } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdBusinessCenter } from "react-icons/md";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { CartContext } from "../Context/CartProvider";

function Navbar() {
  const { state, dispatch, user } = useContext(AuthContext);
  const { cartState } = useContext(CartContext);
  console.log(cartState);
  const totalItems = cartState.CartItems.reduce((acc, curr) => {
    return acc + curr.qty;
  }, 0);
  // console.log(state.token);

  const [lists, setLists] = useState([]);

  const getCourseList = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/getCourse");
      response = await response.json();
      setLists(response.showCourse);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCourseList();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };
  // set the dropdown menu to open on mouse enter
  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  //set the dropdown menu to close on mouse leave
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const handleMouseEnter1 = () => {
    setIsOpen1(true);
  };
  //set the dropdown menu to close on mouse leave
  const handleMouseLeave1 = () => {
    setIsOpen1(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 pt-2">
        <div className="flex justify-between items-center h-16 font-semibold">
          <NavLink to="/" className=" flex items-center">
            <span className="font-bold text-2xl text-[#184f81]">Elite</span>
            <span className="font-bold text-2xl pl-2"> IT Hub</span>
          </NavLink>
          <div className="flex justify-center gap-x-3 items-center">
            <NavLink
              className="h-[40px] w-[70px] flex flex-col justify-center items-center hover:bg-slate-100 hover:text-[#184f81]"
              to="/"
            >
              Home
            </NavLink>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dropdown button */}
              <button
                // onClick={toggleDropdown}
                className="group-hover:flex h-[50px] w-[90px] flex items-center justify-center hover:text-[#184f81] z-50 hover:bg-slate-100"
                to="/courses"
              >
                Courses <FaChevronDown className="ml-1 text-xs" />
              </button>
              {isOpen && (
                <div className="bg-white shadow-lg rounded-md flex flex-col absolute w-52 top-full left-0 font-normal ">
                  {lists.length > 0 ? (
                    <div>
                      {lists.slice(0, 4).map((list, index) => {
                        return (
                          <div key={index}>
                            <NavLink
                              to={`/courseDescription/${list._id}`}
                              className="py-1 text-gray-700 flex pl-6 hover:bg-gray-100 hover:text-[#184f81]"
                              onClick={() => setIsOpen(false)}
                            >
                              {list.name}
                            </NavLink>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="border-t-2 border-gray-300">
                    {/* <NavLink
                      className="py-1 text-gray-700 flex pl-3 hover:bg-gray-100 hover:text-blue-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaCertificate size={18} className="mt-[2px] mr-2" />
                      Certification Prep
                    </NavLink>
                    <NavLink
                      className="py-1 text-gray-700 flex pl-3 hover:bg-gray-100 hover:text-blue-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <SiGoogleclassroom size={18} className="mt-[2px] mr-2" />
                      Demo Classes
                    </NavLink> */}
                    <NavLink
                      className="py-1 text-gray-700 flex pl-3 hover:bg-gray-100 hover:text-[#184f81]"
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                    >
                      <VscCompassActive size={18} className="mt-[2px] mr-2" />
                      Explore More
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
            >
              <button className=" h-[40px] w-[100px] hover:bg-slate-100 flex items-center justify-center hover:text-[#184f81]">
                Students <FaChevronDown className="ml-1 text-xs" />
              </button>
              {isOpen1 && (
                <div className="bg-white shadow-lg rounded-md flex flex-col absolute w-52 top-full left-0 font-normal">
                  <div>
                    <NavLink
                      to="/python"
                      className="py-1 text-gray-700 flex hover:bg-gray-100 pl-3 hover:text-[#184f81]"
                      onClick={() => setIsOpen1(false)}
                    >
                      <FaCertificate size={18} className="mt-1 mr-2" />
                      Verify Certificate
                    </NavLink>
                    <NavLink
                      to="/web-development"
                      className="py-1 text-gray-700 hover:bg-gray-100 flex pl-3 hover:text-[#184f81]"
                      onClick={() => setIsOpen1(false)}
                    >
                      <MdBusinessCenter size={18} className="mt-[2px] mr-2" />
                      Job Placement
                    </NavLink>
                  </div>
                  <div className="mt-1">
                    <NavLink
                      className="py-1 text-gray-700 flex pl-3 hover:bg-gray-100"
                      onClick={() => setIsOpen1(false)}
                    >
                      <FaCertificate size={18} className="mt-[2px] mr-2" />
                      Certification Prep
                    </NavLink>
                    <NavLink
                      className="py-1 text-gray-700 flex pl-3 hover:bg-gray-100"
                      onClick={() => setIsOpen1(false)}
                    >
                      <SiGoogleclassroom size={18} className="mt-[2px] mr-2" />
                      Demo Classes
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            <NavLink
              className="h-[40px] w-[80px] hover:bg-slate-100 flex flex-col justify-center items-center hover:text-[#184f81]"
              to="/aboutus"
            >
              About Us
            </NavLink>
            <NavLink
              className="h-[40px] w-[60px] hover:bg-slate-100 flex flex-col justify-center items-center hover:text-[#184f81]"
              to="/"
            >
              Blog
            </NavLink>
            <NavLink
              className="h-[40px] w-[60px] hover:bg-slate-100 flex justify-center items-center"
              to="/cart"
            >
              <FaShoppingCart size={20} className="hover:text-[#9C27B0]" />
              <span className="bg-orange-600 text-white h-4 w-4 rounded-full flex justify-center items-center text-sm relative bottom-3 pb-[2px]">
                {totalItems}
              </span>
            </NavLink>
          </div>
          <div className="flex space-x-3 h-[50px] justify-center items-center">
            {state.token ? (
              <>
                <button
                  onClick={() => {
                    dispatch({ type: "Logout" });
                  }}
                  className="border-2 flex justify-center items-center h-[40px] w-[120px] border-gray-300 rounded-sm hover:border-red-500"
                >
                  <IoLogOut size={25} className=" mr-2 mt-1" />
                  Log out
                </button>
                <div>
                  <span className="text-base font-medium text-gray-700 relative left-20 flex">
                    <CgProfile size={25} />{" "}
                    <h1 className="pl-2">{user?.name}</h1>
                  </span>
                </div>
              </>
            ) : (
              <div className="flex space-x-3 h-[50px] justify-center items-center">
                <NavLink
                  to="/login"
                  className="border-2 flex justify-center items-center h-[40px] w-[100px] border-gray-300 hover:border-blue-600 hover:text-[#184f81] rounded-sm"
                >
                  <FaSignInAlt size={16} className=" mr-2 mt-1" />
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="flex justify-center items-center h-[40px] w-[100px] rounded-lg text-white bg-blue-600 hover:bg-[#1E90FF]"
                >
                  <FaUserPlus size={16} className=" mr-2" />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
