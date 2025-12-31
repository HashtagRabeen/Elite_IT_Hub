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
import { GiHamburgerMenu } from "react-icons/gi";
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex justify-between items-center h-full font-semibold ">
          <NavLink
            to="/"
            className=" flex flex-nowrap items-center sm:text-xl md:text-xl text-xl"
          >
            <span className="font-bold text-xl sm:text-2xl md:text-3xl text-[#184f81]">
              Elite
            </span>
            <span className="font-bold text-xl sm:text-2xl md:text-3xl pl-2">
              {" "}
              IT Hub
            </span>
          </NavLink>
          {/* hambugger icon added */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <GiHamburgerMenu />
          </button>

          {/* for desktop */}
          <div className="hidden md:flex gap-x-3 items-center">
            <NavLink
              className="h-[40px] px-4 flex justify-center items-center hover:bg-slate-100 hover:text-[#184f81]"
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
                className="group-hover:flex h-[40px] px-3 py-2border flex items-center justify-center hover:text-[#184f81] hover:bg-slate-100"
                to="/courses"
              >
                Courses <FaChevronDown className="ml-1 text-xs" />
              </button>
              {isOpen && (
                <div className="bg-white shadow-lg rounded-md flex flex-col absolute w-52 top-full left-0 font-normal py-1 z-50">
                  {lists.length > 0 ? (
                    <div>
                      {lists.slice(0, 4).map((list) => {
                        return (
                          <div key={list._id}>
                            <NavLink
                              to={`/courseDescription/${list._id}`}
                              className="px-4 py-1 text-gray-700 flex items-center hover:bg-gray-100 hover:text-[#184f81]"
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
                    <NavLink
                      className="py-1 text-gray-700 flex pl-3 hover:bg-gray-100 hover:text-[#184f81]"
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                    >
                      <VscCompassActive size={18} className=" mr-2" />
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
              <button className=" h-[40px] hover:bg-slate-100 flex items-center justify-center hover:text-[#184f81]">
                Students <FaChevronDown className="ml-1 text-xs" />
              </button>
              {isOpen1 && (
                <div className="absolute top-full left-0 bg-white w-56 shadow-lg rounded-md py-1 z-50">
                  <NavLink
                    to="/python"
                    className="px-4 py-2 flex items-center hover:bg-gray-100 hover:text-[#184f81]"
                    onClick={() => setIsOpen1(false)}
                  >
                    <FaCertificate size={18} className="mr-2" />
                    Verify Certificate
                  </NavLink>
                  <NavLink
                    to="/web-development"
                    className="px-4 py-2 flex items-center hover:bg-gray-100 hover:text-[#184f81]"
                    onClick={() => setIsOpen1(false)}
                  >
                    <MdBusinessCenter size={18} className="mr-2" />
                    Job Placement
                  </NavLink>
                  <NavLink
                    className="px-4 py-2 flex items-center hover:bg-gray-100 hover:text-[#184f81]"
                    onClick={() => setIsOpen1(false)}
                  >
                    <FaCertificate size={18} className="mr-2" />
                    Certification Prep
                  </NavLink>
                  <NavLink
                    className="px-4 py-2 flex items-center hover:bg-gray-100 hover:text-[#184f81]"
                    onClick={() => setIsOpen1(false)}
                  >
                    <SiGoogleclassroom size={18} className=" mr-2" />
                    Demo Classes
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              className="h-[40px] px-3 hover:bg-slate-100 flex justify-center items-center hover:text-[#184f81]"
              to="/aboutus"
            >
              About Us
            </NavLink>
            <NavLink
              className="h-[40px] px-3 hover:bg-slate-100 flex flex-col justify-center items-center hover:text-[#184f81]"
              to="/"
            >
              Blog
            </NavLink>
            <NavLink
              className="relative h-[40px] px-3 hover:bg-slate-100 flex justify-center items-center"
              to="/cart"
            >
              <FaShoppingCart size={20} className="hover:text-[#9C27B0]" />
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </NavLink>
          </div>
          <div className="hidden md:flex gap-3 items-center">
            {state.token ? (
              <>
                <button
                  onClick={() => {
                    dispatch({ type: "Logout" });
                  }}
                  className="border flex items-center px-4 py-2 rounded-md hover:border-red-500"
                >
                  <IoLogOut size={25} className=" mr-2" />
                  Log out
                </button>
                <div className="flex  items-center  gap-2">
                  <CgProfile size={25} /> {user?.name}
                </div>
              </>
            ) : (
              <div className="flex space-x-3 h-[50px] justify-center items-center">
                <NavLink
                  to="/login"
                  className="border-2 px-4 py-2 border-gray-300 hover:border-blue-600 hover:text-[#184f81] rounded-sm"
                >
                  <FaSignInAlt size={16} className="inline mr-2" />
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-[#1E90FF]"
                >
                  <FaUserPlus size={16} className="inline mr-2" />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3">
          <NavLink to="/" className="block py-2">
            Home
          </NavLink>
          <NavLink to="/courses" className="block py-2">
            Courses
          </NavLink>
          <NavLink to="/aboutus" className="block py-2">
            About Us
          </NavLink>
          <NavLink to="/cart" className="block py-2">
            Cart ({totalItems})
          </NavLink>

          {state.token ? (
            <>
              <div className="flex items-center gap-2 py-2">
                <CgProfile /> {user?.name}
              </div>
              <button
                onClick={() => dispatch({ type: "Logout" })}
                className="border w-full py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block py-2 bg-green-400 text-white text-center rounded"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block py-2 bg-blue-600 text-white text-center rounded"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
