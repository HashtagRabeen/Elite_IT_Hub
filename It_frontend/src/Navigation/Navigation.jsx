import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaPython,
  FaCode,
  FaDatabase,
  FaPaintBrush,
  FaCertificate,
  FaLaptopCode,
  FaUserGraduate,
  FaSignInAlt,
  FaBriefcase,
  FaUsers,
  FaChevronDown,
  FaUserPlus
} from 'react-icons/fa';
// import logo from '../assets/logo.png'; // Make sure to place your logo correctly

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? '' : 'hidden';
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="flex items-center">
            {/* <img src={} alt="Sipalaya Info Tech" className="h-10 w-auto" /> */}
            <span className="ml-3 text-xl font-bold text-blue-600">
              Sipalaya<span className="text-gray-900">Tech</span>
            </span>
          </NavLink>
          
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className="text-gray-900 hover:text-blue-600 font-medium">Home</NavLink>

            <div className="relative group">
              <button className="flex items-center text-gray-900 hover:text-blue-600 font-medium">
                Courses <FaChevronDown className="ml-1 text-xs" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-10">
                <NavLink to="/python" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaPython className="mr-3" />Python Programming
                </NavLink>
                <NavLink to="/web-development" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaCode className="mr-3" />Web Development
                </NavLink>
                <NavLink to="/data-science" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaDatabase className="mr-3" />Data Science
                </NavLink>
                <NavLink to="/graphic-design" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaPaintBrush className="mr-3" />Graphic Design
                </NavLink>
                <div className="border-t border-gray-200 my-1" />
                <NavLink to="/certification" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaCertificate className="mr-3" />Certification Prep
                </NavLink>
                <NavLink to="/demo-classes" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaLaptopCode className="mr-3" />Demo Classes
                </NavLink>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-gray-900 hover:text-blue-600 font-medium">
                Students <FaChevronDown className="ml-1 text-xs" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-10">
                <NavLink to="/portal" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaUserGraduate className="mr-3" />Student Portal
                </NavLink>
                <NavLink to="/admission" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaSignInAlt className="mr-3" />Admission Process
                </NavLink>
                <NavLink to="/job-placement" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaBriefcase className="mr-3" />Job Placement
                </NavLink>
                <NavLink to="/alumni" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaUsers className="mr-3" />Alumni Stories
                </NavLink>
              </div>
            </div>

            <NavLink to="/about" className="text-gray-900 hover:text-blue-600 font-medium">About Us</NavLink>
            <NavLink to="/blog" className="text-gray-900 hover:text-blue-600 font-medium">Blog</NavLink>

            <div className="flex space-x-3 ml-6">
              <NavLink to="/login" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 hover:border-blue-600 hover:text-blue-600 flex items-center">
                <FaSignInAlt className="mr-2" />Login
              </NavLink>
              <NavLink to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                <FaUserPlus className="mr-2" />Register
              </NavLink>
            </div>
          </div>

          <button onClick={toggleMobileMenu} className="lg:hidden text-2xl text-gray-900">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white fixed inset-0 z-40 p-4 overflow-y-auto">
          <NavLink to="/" onClick={toggleMobileMenu} className="flex items-center mb-6">
            <img alt="Sipalaya Info Tech" className="h-10 w-auto" />
            <span className="ml-3 text-xl font-bold text-blue-600">
              Sipalaya<span className="text-gray-900">Tech</span>
            </span>
          </NavLink>

          <NavLink to="/" className="block py-2 font-medium text-gray-900 hover:text-blue-600" onClick={toggleMobileMenu}>Home</NavLink>

          <button onClick={() => toggleDropdown('courses')} className="flex justify-between items-center w-full py-2 font-medium text-gray-900">
            Courses <FaChevronDown />
          </button>
          {openDropdown === 'courses' && (
            <div className="pl-4">
              <NavLink to="/python" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Python Programming</NavLink>
              <NavLink to="/web-development" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Web Development</NavLink>
              <NavLink to="/data-science" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Data Science</NavLink>
              <NavLink to="/graphic-design" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Graphic Design</NavLink>
              <NavLink to="/certification" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Certification Prep</NavLink>
              <NavLink to="/demo-classes" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Demo Classes</NavLink>
            </div>
          )}

          <button onClick={() => toggleDropdown('students')} className="flex justify-between items-center w-full py-2 font-medium text-gray-900">
            Students <FaChevronDown />
          </button>
          {openDropdown === 'students' && (
            <div className="pl-4">
              <NavLink to="/portal" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Student Portal</NavLink>
              <NavLink to="/admission" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Admission Process</NavLink>
              <NavLink to="/job-placement" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Job Placement</NavLink>
              <NavLink to="/alumni" className="block py-1 text-gray-700" onClick={toggleMobileMenu}>Alumni Stories</NavLink>
            </div>
          )}

          <NavLink to="/about" className="block py-2 font-medium text-gray-900 hover:text-blue-600" onClick={toggleMobileMenu}>About Us</NavLink>
          <NavLink to="/blog" className="block py-2 font-medium text-gray-900 hover:text-blue-600" onClick={toggleMobileMenu}>Blog</NavLink>

          <div className="mt-4 space-y-2">
            <NavLink to="/login" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 hover:border-blue-600 hover:text-blue-600">
              <FaSignInAlt className="inline-block mr-2" />Login
            </NavLink>
            <NavLink to="/register" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              <FaUserPlus className="inline-block mr-2" />Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
