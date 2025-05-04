import { useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Bounce, Flip, toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const createUser = async (e) => {
    try {
      e.preventDefault();
      let response = await fetch("http://localhost:9000/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });
      response = await response.json();
      console.log(response);
      toast.success(response.message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="font-sans bg-gray-300 min-h-screen flex">
      <div className="flex w-[60%] m-auto h-[550px]  bg-white rounded-3xl">
        <div className="w-[50%] flex flex-col items-center">
          <div className=" mt-12">
            <h1 className="text-4xl font-bold text-[#212529]">Registration</h1>
          </div>
          <div className="mt-2">
            <form onSubmit={createUser} className="flex flex-col">
              <label htmlFor="name"></label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="name"
                placeholder="Full Name"
                required
                id="name"
                className="outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-5"
              />
              <label htmlFor="email"></label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
                required
                id="email"
                className="outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-5"
              />
              <label htmlFor="phone"></label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="tel"
                placeholder="Phone Number"
                required
                id="number"
                pattern="[0-9]*"
                inputMode="numeric"
                className="outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-5"
              />
              <label htmlFor="password"></label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
                required
                id="password"
                className=" outline-none py-[10px] w-90 bg-gray-100 rounded-xl p-4 mt-5"
              />
              <button
                type="submit"
                className="py-[10px] bg-blue-400 font-semibold text-white text-lg mt-5 rounded-xl"
              >
                Register
              </button>
              <p className=" text-center mt-5">
                or register with social platforms
              </p>

              <div className="flex justify-center gap-4 mt-5">
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <RiGoogleFill size={18} />
                </div>
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <FaFacebookF size={18} />
                </div>
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <FaGithub size={18} />
                </div>
                <div className="border-2 border-gray-400 h-10 w-10 rounded-lg flex justify-center items-center">
                  <FaLinkedinIn size={18} />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className=" w-[50%] flex flex-col justify-center items-center gap-5 text-white bg-blue-400 rounded-tl-[150px] rounded-bl-[150px] rounded-r-3xl">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p>Already have an account?</p>
          <NavLink
            to="/login"
            className="border-2 border-white py-2 px-12 rounded-lg font-semibold"
          >
            login
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Signup;
